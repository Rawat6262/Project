let mongoose = require('mongoose')
let Companyschemma = new mongoose.Schema({
    company_name: {
        type: String,
        required: true,
    }, company_email: {
        type: String,
        required: true
    }, company_nature: {
        type: String,
        required: true
    }, company_phone_number: {
        type:Number,
        required: true,
        unique: true
    }, company_address: {
        type: String,
        required: true,
    }, pincode: {
        type: Number,
        required: true
    },createdBy:{
        type:mongoose.Schema.ObjectId,
        ref:'exhibition'
    },exhibition:{
        type:String,
        required:true
    }
});
let companyModel = mongoose.model('companyModel', Companyschemma);
module.exports= companyModel;