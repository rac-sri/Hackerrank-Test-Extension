const express = require('express');
const router = express.Router();
const _ = require('lodash');
const {Hostname,validateReq} = require('../models/allowedHostnamesModel');
const invAuth = require('../middleware/invAuth-middleware');

router.get('/',async (req,res)=>{
    const hostnames = await Hostname.find();
    
    
    res.send(hostnames);     
});

router.post('/',invAuth,async (req,res)=>{
    const {error} = validateReq(req.body);
    if(error)return res.status(400).send(error.details[0].message);

    let hostname = await Hostname.findOne({hostname:req.body.hostname});
    if(hostname)return res.status(400).send('Given hostname is already added');

    hostname = new Hostname(_.pick(req.body,['hostname']));
    
    await hostname.save();

    res.send(hostname);
});

router.delete('/:id',invAuth,async (req,res)=>{

    let hostname = await Hostname.findOneAndDelete({hostname:req.params.id});
    if(!hostname)return res.status(400).send('Given hostname not found');
    res.send(hostname);

});

module.exports = router;