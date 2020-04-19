const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/auth', ( req, res )=>{   
    res.sendFile(path.join(__dirname, '../public/invigilator/', 'invigilatorLogin.html'));
});

router.get('/', ( req, res )=>{   
    res.sendFile(path.join(__dirname, '../public/invigilator/', 'invigilatorPage.html'));
});

router.get('/set_test_url' , ( req, res )=>{   
    res.sendFile(path.join(__dirname, '../public/invigilator/', 'inv_setTestURL.html'));
});


module.exports = router;