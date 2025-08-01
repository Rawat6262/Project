let mongoose = require('mongoose')
let exhibitionschema = new mongoose.Schema({
    exhibition_name :{
        type : String,
        required:true
    },addedBy:{
        type:String,
        required:true
    },
    exhibition_address:{
        type:String,
        required:true
    },category:{
        type:String,
        required:true
    },
    createdby:{
        type:mongoose.Schema.ObjectId,
        ref :'user'
    }
})
let exhibitionModel =  mongoose.model('exhibitionModel',exhibitionschema);


module.exports=exhibitionModel;