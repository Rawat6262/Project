const path = require('path');
const companyModel = require('../Model/Company');
const exhibitionModel = require('../Model/Exhibition');
const ProductModel = require('../Model/ProductModel');
const Signupmodel = require('../Model/SignupModel');
const { setExhibition, setname } = require('../Service/Auth');
const fs = require('fs');
const mongoose = require("mongoose");   // ✅ FIXED (no import, use require)

// ✅ Helper to handle server errors consistently
const handleServerError = (res, err, message = "Internal Server Error") => {
  console.error("❌", err);
  return res.status(500).json({ message });
};

// ✅ Signup
async function handlesignup(req, res) {
  try {
    const {
      first_name,
      last_name,
      designation,
      mobile_number,
      password,
      address,
      email,
      website,
      state,
      city,
      country,
      company_name,
    } = req.body;

    const sign = await Signupmodel.create({
      first_name,
      last_name,
      designation,
      password,
      mobile_number,
      address,
      website,
      city,
      email,
      state,
      country,
      company_name,
    });

    if (!sign) {
      return res.status(400).json({ message: "Signup failed" });
    }

    const token = setExhibition(sign);
    res
      .cookie("uid", token)
      .status(201)
      .json({
        message: "New user created successfully",
        user: sign, // ✅ Return the created user for the frontend
      });

  } catch (err) {
    return handleServerError(res, err, "Signup failed");
  }
}


// ✅ Login
// async function handlelogin(req, res) {
//   try {
//     const { email, password } = req.body;

//     const user = await Signupmodel.findOne({ email, password });
//     if (!user) return res.status(401).send('Login failed');
//     const token = setExhibition(user);
//     console.log(user,'rwe')
//     res.cookie('uid', token).send('Login successful').send(user);
//   } catch (err) {
//     return handleServerError(res, err, "Login failed");
//   }
// }
async function handlelogin(req, res) {
  try {
    const { email, password } = req.body;

    const user = await Signupmodel.findOne({ email, password });
    if (!user) return res.status(401).send('Login failed');

    const token = setExhibition(user);
    console.log(user, 'rwe');

    res
      .cookie('uid', token)
      .status(200)
      .json({
        message: 'Login successful',
        user, // ✅ Send user object along with the message
      });

  } catch (err) {
    return handleServerError(res, err, "Login failed");
  }
}

// ✅ Get all organisers
async function handleorganiser(req, res) {
  try {
    const result = await Signupmodel.find({});
    res.json(result);
  } catch (err) {
    return handleServerError(res, err, "Failed to fetch organisers");
  }
}

// ✅ Get exhibitions created by logged-in user
async function handleGetExhibition(req, res) {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(400).json({ message: 'User ID is missing' });

    const exhibitions = await exhibitionModel.find({ createdby: userId }).lean();
    res.status(200).json(exhibitions);
  } catch (err) {
    return handleServerError(res, err, "Failed to fetch exhibitions");
  }
}

// ✅ Add new exhibition
async function handleExhibition(req, res) {
  try {
    console.log("Uploaded Files:", req.files);

    const exhibitionImage = req.files["exhibition_image"]?.[0];
    const layoutFile = req.files["layout"]?.[0];

    if (!exhibitionImage || !layoutFile) {
      return res.status(400).json({ message: "Both exhibition image and layout are required" });
    }

    const {
      exhibition_name,
      exhibition_address,
      category,
      starting_date,
      ending_date,
      venue,
      about_exhibition,
    } = req.body;

    const { _id: userId, email } = req.user;

    const newExhibition = await exhibitionModel.create({
      exhibition_name,
      exhibition_address,
      category,
      starting_date,
      ending_date,
      venue,
      createdby: userId,
      addedBy: email,
      about_exhibition,

      // 👇 These fields are required in your schema
      exhibtion_path: exhibitionImage.path,
      exhibtion_filename: exhibitionImage.filename,
      layout_path: layoutFile.path,
      layout_filename: layoutFile.filename,
    });

    if (!newExhibition) {
      return res.status(400).send("Exhibition creation failed");
    }

    const token = setname(newExhibition);
    res.cookie("name", token).send("Exhibition added successfully");
  } catch (err) {
    return handleServerError(res, err, "Failed to create exhibition");
  }
}

// ✅ Add new company
async function handlepostcompany(req, res) {
  try {
    let { path, filename } = req.file;
    const { company_name, company_email, company_nature, about_company, company_phone_number, company_address, pincode, createdBy } = req.body;

    const company = await companyModel.create({
      company_name,
      company_email,
      company_nature,
      company_phone_number,
      company_address,
      pincode,
      createdBy,
      about_company, path, filename
    });

    res.status(201).json({ message: 'Company added successfully', company });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Company with this phone number already exists' });
    }
    return handleServerError(res, err, "Failed to add company");
  }
}

// ✅ Find exhibition by ID
async function handleFindExhibition(req, res) {
  try {
    const id = req.params.id || req.body.id;
    if (!id) return res.status(400).json({ error: "Exhibition ID is required" });
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Exhibition ID" });
    }

    const exhibition = await exhibitionModel.findById(id).lean();
    if (!exhibition) return res.status(404).json({ error: "Exhibition not found" });

    return res.json(exhibition);
  } catch (err) {
    return handleServerError(res, err, "Failed to fetch exhibition");
  }
}

// ✅ Delete exhibition
async function handleDelete(req, res) {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Exhibition ID is required" });

    const deletedExhibition = await exhibitionModel.findByIdAndDelete(id);
    const deletecompany = await companyModel.deleteMany({ createdBy: id });
    const deleteproduct = await ProductModel.deleteMany({ exhibitionid: id });

    if (!deletedExhibition && !deletecompany && !deleteproduct) return res.status(404).json({ error: "Exhibition not found" });

    return res.json({
      message: "✅ Exhibition deleted successfully",
      deletedExhibition,
    });
  } catch (err) {
    console.error("Error deleting exhibition:", err);
    return res.status(500).json({ error: "Failed to delete exhibition" });
  }
}

// ✅ Get company by ID
async function handleGetaddCompany(req, res) {
  try {
    const { id } = req.params;
    const company = await companyModel.findById(id);

    if (!company) return res.status(404).json({ message: "Company not found" });
    res.json(company);
  } catch (err) {
    return handleServerError(res, err, "Failed to fetch company");
  }
}

// ✅ Get products by company
async function handleGetproduct(req, res) {
  try {
    const { id } = req.params;
    const company = await ProductModel.find({ createdBy: id });

    if (!company) return res.status(404).json({ message: "Product not found" });
    res.json(company);
  } catch (err) {
    return handleServerError(res, err, "Failed to fetch Product");
  }
}

// ✅ Get companies by creator ID
async function handleGetCompany(req, res) {
  try {
    const { id } = req.params;
    const company = await companyModel.find({ createdBy: id });

    if (!company) return res.status(404).json({ message: "Company not found" });
    res.json(company);
  } catch (err) {
    return handleServerError(res, err, "Failed to fetch company");
  }
}

// ✅ Add new product
async function handlePostProduct(req, res) {
  try {
    console.log("Uploaded File:", req.file);
    const { path, filename } = req.file;
    const { product_name, category, price, details, createdBy, exhibitionid } = req.body;

    const product = await ProductModel.create({
      product_name,
      category,
      price,
      details,
      path,
      filename,
      createdBy,
      exhibitionid
    });

    res.json({
      message: "✅ Product uploaded successfully",
      product
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Upload failed", error: err.message });
  }
}

// ✅ Find signup user by ID
async function handlefindsignup(req, res) {
  try {
    const { id } = req.params;
    const result = await Signupmodel.findById(id);
    if (!result) return res.status(404).json({ message: "User not found" });

    res.send(result);
  } catch (err) {
    return handleServerError(res, err, "Signup failed");
  }
}



async function handlegetBrochure(req, res) {
  try {
    const { id } = req.params;
    console.log(id)
    const companyData = await companyModel.findById(id);
    console.log(companyData)
    if (!companyData) {
      return res.status(404).json({ msg: "Company not found" });
    }

    if (!companyData.filename) {
      return res.status(404).json({ msg: "No brochure uploaded for this company" });
    }

    const filePath = path.resolve("company_uploads", companyData.filename);
    return res.download(filePath, companyData.filename);
  } catch (error) {
    console.error("Error downloading brochure:", error);
    return res.status(500).json({ msg: "Server error" });
  }
}



module.exports = {
  handlegetBrochure,
  handlesignup,
  handleDelete,
  handlelogin,
  handleorganiser,
  handleGetExhibition,
  handleExhibition,
  handlepostcompany,
  handleFindExhibition,
  handleGetCompany,
  handleGetaddCompany,
  handlePostProduct,
  handleGetproduct,
  handlefindsignup
};
