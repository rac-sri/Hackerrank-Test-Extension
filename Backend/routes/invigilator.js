const express = require('express');
const router = express.Router();
const path = require('path');
const auth = require('../middleware/auth-middleware');
const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

router.get('/auth', ( req, res )=>{   
    res.sendFile(path.join(__dirname, '../public/invigilator/', 'invigilatorLogin.html'));
});

router.get('/'  , ( req, res )=>{   
    res.sendFile(path.join(__dirname, '../public/invigilator/', 'invigilatorPage.html'));
});

router.get('/set_test_url' , ( req, res )=>{   
    res.sendFile(path.join(__dirname, '../public/invigilator/', 'inv_setTestURL.html'));
});


router.post('/startTest',auth,async (req,res)=>{
    const {error} = validateTestURL(req.body);
    if(error)return res.status(400).send(error.details[0].message);
    
    global.testURL = req.body.testURL;
    
    // console.log(testURL);
    
    mongoose.connection.db.dropCollection('reports', err=> {//remove prev canidates
        if(err) return;
    });
    res.send('ok');
});

router.post('/invAuth',async (req,res)=>{
    const {error} = validateAuthReq(req.body);
    if(error)return res.status(400).send(error.details[0].message);
 
    if(req.body.inv !== config.get('invUsername') || req.body.password !== config.get('invPass')) 
        return res.status(400).send('Invalid Username or Password');
    
    const token = getAuthToken();
    res.send(token);

})

function getAuthToken(){
    return jwt.sign({},config.get('jwtPrivateKey'))
}

function validateAuthReq(req){
    const schema={
        inv: Joi.string().max(255).required(),
        password: Joi.string().max(255).required()
    }
    return Joi.validate(req,schema);
}

function validateTestURL(req){
    const schema = {
        testURL: Joi.string().required().max(255).uri()
    }
    return Joi.validate(req,schema);
}

module.exports = router;