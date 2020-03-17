const mongoose = require('mongoose');
const Joi = require('joi');


hostnameSchema = new mongoose.Schema({
    hostname:{
        type:String,
        required:true,
        unique:true
    }
});
const Hostname = mongoose.model('hostname',hostnameSchema);

function validateReq(req){
    const schema = {
        hostname: Joi.string().required()
    }
    return Joi.validate(req,schema);
}

module.exports.Hostname =Hostname;
module.exports.validateReq =validateReq;
module.exports.hostnameSchema =hostnameSchema;
