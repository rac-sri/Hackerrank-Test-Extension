const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {User, validateUser} = require('../models/userModel');
const Joi = require('joi');


router.post('/',async(req,res)=>{
    const {error} = validateReq(req.body);
    
    if(error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid Email or Password');
    
    const validPassword  = await bcrypt.compare(req.body.password, user.password );
    if(!validPassword) return res.status(400).send('Invalid Email or Password');

    const token = user.generateAuthToken();
    res.send(token);
})

function validateReq(req){
    const schema = {
        email: Joi.string().max(255).required().email(),
        password: Joi.string().required()
    }
    return Joi.validate(req,schema);
}

module.exports = router;