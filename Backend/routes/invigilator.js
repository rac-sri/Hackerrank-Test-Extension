const express = require('express');
const router = express.Router();
const path = require('path');
const invAuth = require('../middleware/invAuth-middleware');
// console.log(__dirname);
const Joi = require('joi');
const mongoose = require('mongoose');
// const file = require('')

// router.use(invAuth);

router.get('/', ( req, res )=>{   
    res.sendFile(path.join(__dirname, '../public/invigilator/', 'invigilatorPage.html'));
});

router.get('/set_test_url', ( req, res )=>{   
    res.sendFile(path.join(__dirname, '../public/invigilator/', 'inv_setTestURL.html'));
});


router.post('/startTest',async (req,res)=>{
    const {error} = validateTestURL(req.body);
    if(error)return res.status(400).send(error.details[0].message);
    
    global.testURL = req.body.testURL;
    
    console.log(testURL);
    
    mongoose.connection.db.dropCollection('reports', err=> {//remove prev canidates
        if(err) return;
    });
    res.send('ok');
});

function validateTestURL(req){
    const schema = {
        testURL: Joi.string().required().max(255).uri()
    }
    return Joi.validate(req,schema);
}

module.exports = router;