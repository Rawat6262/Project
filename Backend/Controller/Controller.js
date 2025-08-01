
const companyModel = require('../Model/Company');
const exhibitionModel = require('../Model/Exhibition');
let Signupmodel = require('../Model/SignupModel');
const { setExhibition, setname } = require('../Service/Auth');
async function handlesignup(req, res) {
  let { first_name,last_name,designation,mobile_number,password,address,email, website,state,city,country,company_name } = req.body;
  let sign = await Signupmodel.create({
    first_name,last_name,designation,password,mobile_number,address,website,city,email ,state,country,company_name})
  if (!sign) res.send('Signup failed');

  let token = setExhibition(sign)
  // console.log(token)
  res.cookie('uid', token);
  res.send('new user create')
}

async function handlelogin(req, res) {
  let { email, password } = req.body;
  let ress = await Signupmodel.findOne({
    email: email,
    password: password
  })
  if (!ress) {
    return res.send('login failed');
  }
  // console.log('dfvfvdsfvv', ress)
  let token = setExhibition(ress)
  // console.log(token)
  res.cookie('uid', token);
  return res.send('login successful')
}
async function handleorganiser(req, res) {
  let result = await Signupmodel.find({});
  res.send(result)
}

async function handleGetExhibition(req, res) {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is missing in request' });
    }

    const exhibitions = await exhibitionModel
      .find({ createdby: userId })
      .lean();

    res.status(200).json(exhibitions);
  } catch (err) {
    console.error('Error fetching exhibitions:', err);
    res.status(500).json({ message: 'Failed to fetch exhibitions' });
  }
}


async function handleExhibition(req, res) {
  // console.log(req)
  try {
    const { exhibition_name, Exhibition_address, category } = req.body;
    let userid = req.user._id;
    let emailex = req.user.email;
    console.log(emailex)
    const newExhibition = await exhibitionModel.create({
      exhibition_name,
      exhibition_address: Exhibition_address,
      addedBy: emailex,
      category,
      createdby: userid
    });

    console.log('Exhibition created:', newExhibition);
    if (!newExhibition) return res.send('Exhibition Failed');
    let token = setname(newExhibition)
    res.cookie('name', token)
    res.send('Exhibition added successfully');
  } catch (err) {
    console.error('Error creating exhibition:', err);
    res.status(500).send('Failed to create exhibition');
  }
}

async function handlepostcompany(req, res) {
  // console.log(req.body);
  const { company_name, company_email, company_nature, company_phone_number, company_address, pincode } = req.body;
  let id = req.exhibition._id;
  let name = req.exhibition.Exhibition;
  try {
    const company = await companyModel.create({
      company_name,
      company_email,
      company_nature,
      company_phone_number,
      company_address,
      pincode,
      createdBy: id,
      exhibition: name
    });

    if (!company) {
      return res.status(400).send('Company not added');
    }
console.log('company_created', company)
    return res.status(201).send('Company added successfully');
  } catch (e) {
    console.error(e);

    if (e.code === 11000) {
      return res.status(400).send('Company with this phone number already exists');
    }

    return res.status(500).send('Internal Server Error');
  }
}

async function handleGetCompany(req, res) {
  try {
    const id = req.exhibition?._id;
    const name = req.exhibition?.Exhibition;
    console.log(id);
    if (!id) {
      return res.status(400).json({ message: 'Exhibition ID is missing' });
    }

    const companies = await companyModel.find({ createdBy: id });

    res.status(200).json(companies);
  } catch (err) {
    console.error('Error fetching Company:', err);
    res.status(500).json({ message: 'Failed to fetch Company' });
  }
}

module.exports = {
  handlesignup, handlelogin, handlepostcompany, handleGetCompany, handleorganiser, handleExhibition, handleGetExhibition
}