// import mongoose from 'mongoose';
// import Joi from 'joi ';
const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength: 255
    },
    email:{
        type:String,
        required:true,
        unique: true,
        maxlength: 255
    },
    password:{
        type:String,
        required:true,
        maxlength: 255,
        minlength: 8
    }
});

userSchema.methods.generateAuthToken = function(){
    return jwt.sign( { email:this.email, name:this.name} , config.get('jwtPrivateKey'));
}

const User = mongoose.model('user',userSchema);

function validateUser(user){
    const schema = {
        name: Joi.string().max(255).required(),
        email: Joi.string().max(255).required().email(),
        password: Joi.string().max(255).min(8).required()
        
    }
    return Joi.validate(user,schema);
}
module.exports.User = User;
module.exports.validateUser = validateUser;
module.exports.userSchema = userSchema;