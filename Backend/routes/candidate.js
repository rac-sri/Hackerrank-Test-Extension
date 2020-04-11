const express = require('express');
const router = express.Router();
const _ = require('lodash');

const {Candidate} = require('../models/candidateModel');


router.get('/',async (req,res)=>{
    const testURL = global.testURL;
    const io = req.app.get('socketio');
    if(!testURL)
        return res.status(400).send('test has not been started by the invigilator yet');
    
    if(!req.header('x-username')){
        return res.status(400).send('no username header');
    }

    console.log('username in req:',req.header('x-username'));
    
    let candidate = await Candidate.findOne({username: req.header('x-username')});
    
    if(!candidate){
        candidate = new Candidate({
            username: req.header('x-username'),
            status: 'login',
            details:[{
                URL:'-' 
                }
            ]
        });
        
    }else{
        candidate.status = 're-login';
        candidate.details.push(
            {URL:'-'}
        )
    }
    const report= {
        username: candidate.username,
        status: candidate.status,
        lastReport: _.last(candidate.details)
    } 
    io.emit('report',report);

    await candidate.save();
    console.log('testUrl',testURL);
    
    res.send(testURL);    
});


module.exports = router;
