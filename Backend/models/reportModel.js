const mongoose = require('mongoose'); 
const Joi  = require('joi');

const reportSchema = new mongoose.Schema({
    userEmail:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    URL:{
        type:String,
        required:true
    },
    timestamp:{
        type:Date,
        default: Date.now()
    }
});

const Report = mongoose.model('report', reportSchema);

function validateReq(req){
    const schema = {
        URL:Joi.string().uri().required()
    }
    return Joi.validate(req,schema);
}

module.exports.Report = Report;
module.exports.reportSchema = reportSchema;
module.exports.validateReq = validateReq;