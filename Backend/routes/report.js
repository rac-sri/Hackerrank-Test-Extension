const express= require('express');
const router= express.Router();
const {Report,validateReq} = require('../models/reportModel');
const _ = require('lodash');
const auth = require('../middleware/auth-middleware');

router.get('/',async (req,res)=>{
    const reports = await Report.find();
    res.send(reports);
});


router.post('/',auth,async (req,res)=>{
    const {error} = validateReq(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const report = new Report({
        userEmail: req.user.email,
        name: req.user.name,
        URL: req.body.URL
    })

    await report.save();

    res.send(_.pick(report,['name','userEmail','URL']));
});

module.exports = router;