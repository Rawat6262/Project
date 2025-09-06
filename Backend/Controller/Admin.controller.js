let companyModel= require('../Model/Company');
let  Signupmodel= require('../Model/SignupModel');
let exhibitionModel= require('../Model/Exhibition');
async function AdmingetSignup(req,res){
    let result =    await Signupmodel.find({});
    res.send(result);
};
async function Admingetexhibition(req,res){
    let result =    await exhibitionModel.find({});
    res.send(result);
};
async function Admingetcompany(req,res){
    let result =    await companyModel.find({});
    res.send(result);
};

module.exports = {
    AdmingetSignup,
    Admingetcompany,
    Admingetexhibition
};