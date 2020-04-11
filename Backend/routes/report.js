const express= require('express');
const router= express.Router();
const {Candidate} = require('../models/candidateModel');
const _ = require('lodash');
const auth = require('../middleware/auth-middleware');
const Joi = require('joi');

router.get('/',async (req,res)=>{
    const candidates = await Candidate.find();
    const reports=[]
    candidates.forEach(c=>{
        reports.push({
            username: candidate.username,
            status: candidate.status,
            lastReport: _.last(candidate.details)
        }) 
    })
    res.send(reports);
});


router.post('/',async (req,res)=>{
    const io = req.app.get('socketio');
    

    console.log('canidate :');
    const {error} = validateReq(req.body);
    if(error) {
        console.log(error)
        return res.status(400).send(error.details[0].message);
    }
    let candidate = await Candidate.findOne({username: req.body.username});

    if(!candidate){
        candidate = new Candidate({
            username: req.body.username,
            status:'cheating',
            details:[ {URL: req.body.URL} ]
        });
    }else{
        candidate.status= 'cheating'
        candidate.details.push({
            URL: req.body.URL
        });
    }
    if(req.body.URL ==='logout')candidate.status='logout';
    
    await candidate.save();
    const report= {
        username: candidate.username,
        status: candidate.status,
        lastReport: _.last(candidate.details)
    }   
    io.emit('report',report);

    res.send(_.pick(candidate,['username','details']));
});

function validateReq(req){
    const schema = {
        username: Joi.string().required().max(255),
        URL: Joi.string().required()
    }
    return Joi.validate(req,schema);
}

module.exports = router;