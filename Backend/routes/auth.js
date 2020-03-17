const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {User, validateUser} = require('../models/userModel');
const Joi = require('joi');
const {LoggedINUser} = require('../models/loggedInUsersModel');
const authMiddleware = require('../middleware/auth-middleware');
const invAuth = require('../middleware/invAuth-middleware');
const jwt = require('jsonwebtoken');
const config = require('config');

router.get('/',invAuth,async(req,res)=>{
    const loggedInUsers = await LoggedINUser.find();
    const users=[];
    loggedInUsers.forEach(element=>{
        const payload = jwt.verify(element.token , config.get('jwtPrivateKey'));
        users.push(payload);
    });


    res.send(users);
})

router.post('/',async(req,res)=>{
    const {error} = validateReq(req.body);
    
    if(error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid Email or Password');
    
    const validPassword  = await bcrypt.compare(req.body.password, user.password );
    if(!validPassword) return res.status(400).send('Invalid Email or Password');

    const token = user.generateAuthToken();
    res.send(token);
    
    const loggedIN = new LoggedINUser({
        token
    })
    await loggedIN.save();

})

router.delete('/',authMiddleware,async (req,res)=>{
    let loggedInUser = await LoggedINUser.findOneAndDelete({token:req.header('x-auth-token')});

    if(!loggedInUser)return res.status(400).send('Given user not logged In');
    res.send(loggedInUser);
});

function validateReq(req){
    const schema = {
        email: Joi.string().max(255).required().email(),
        password: Joi.string().required()
    }
    return Joi.validate(req,schema);
}

module.exports = router;