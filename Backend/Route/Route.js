const express = require('express');
const {
  handleDelete,
  handlesignup,
  handlelogin,
  handleorganiser,
  handleGetaddCompany,
  handleExhibition,
  handleGetExhibition,
  handleFindExhibition,
  handlepostcompany,
  handleGetCompany,
  handlePostProduct,
  handleGetproduct,
  handlefindsignup,
  handlegetBrochure
} = require('../Controller/Controller');

const {
  AdmingetSignup,
  Admingetcompany,
  Admingetexhibition,
  Admingetproduct,
  Admindeleteallexhibition,Admindeleteallcompany,
  Admindeleteallproduct
} = require('../Controller/Admin.controller');

const {
  restrictToLoginUser,
  upload,
  productstorage,
  productupload,
  exhibitionupload,
  companyupload
} = require('../Middleware/Middleware');

const router = express.Router();

/**
 * 🔑 Auth Routes
 */
router.post('/api/signup', handlesignup);
router.post('/api/login', handlelogin);
router.get('/api/find/signup/:id', handlefindsignup);

/**
 * 🎪 Exhibition Routes
 */
router.post('/api/exhibition',exhibitionupload.fields([{ name: "exhibition_image" }, { name: "layout" }]), restrictToLoginUser, handleExhibition);
router.get('/api/exhibition', restrictToLoginUser , handleGetExhibition);
router.post('/api/findexhibition', handleFindExhibition);
router.get('/api/find/exhibition/:id', handleFindExhibition);
router.delete('/api/delete/exhibition/:id', handleDelete);
/**
 * 🏢 Company Routes
 */
router.post('/api/company',companyupload.single('brochure'), handlepostcompany);
router.get('/api/company/:id', handleGetCompany); 
router.get('/api/company/addproduct/:id', handleGetaddCompany); 
router.get('/api/product/:id', handleGetproduct); 
router.post("/api/product", productupload.single("image"),handlePostProduct);
router.get('/api/brochure/:id',handlegetBrochure)
/**
 * 📊 Dashboard / Organisers
 */
router.get('/api/dashboard', handleorganiser);

/**
 * 👑 Admin Routes
 */
router.get('/api/admin/signup', AdmingetSignup);
router.get('/api/admin/exhibition', Admingetexhibition);
router.get('/api/admin/company', Admingetcompany);
router.get('/api/admin/product', Admingetproduct);
router.delete('/api/admin/deleteallexhibition', Admindeleteallexhibition);
router.delete('/api/admin/deleteallproduct', Admindeleteallproduct);
router.delete('/api/admin/deleteallcompany', Admindeleteallcompany);

module.exports = router;
