let express= require('express');
const {handlesignup,handlepostcompany, handleorganiser ,handleExhibition ,handleGetExhibition,handleGetCompany} = require('../Controller/Controller');
const {handlelogin} = require('../Controller/Controller');
const {restrictToLoginUser,addvaluetoexhibition} = require('../Middleware/Middleware');

 let router = express.Router();

 router.post('/api/signup',handlesignup )
 router.post('/api/login',handlelogin )
 router.post('/api/Exhibition', restrictToLoginUser, handleExhibition ) 
 router.get('/api/Exhibition', restrictToLoginUser, handleGetExhibition) 
 router.get('/api/Dashboard', handleorganiser )
 router.post('/api/company',addvaluetoexhibition, handlepostcompany )
 router.get('/api/company', handleGetCompany )

 module.exports = {
    router
 };