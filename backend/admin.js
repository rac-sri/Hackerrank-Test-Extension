const express= require('express')
const mongoose=require('mongoose')
const models=require('./models')
const sessions=require('client-sessions')

const bodyParser= require('body-parser')
const bcrypt=require('bcrypt')

const  Timer  = models.Timer

const router=express.Router()

router.use(sessions({
    cookieName:"session",
    duration: 5*60*1000,
    secret:"wtfitstopsecretbsdk",
    httpOnly:true
}))


router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended:true}))

mongoose.connect('mongodb://localhost/owasptestextension',{ useNewUrlParser: true })
    .then((db)=>console.log(`connected to ${db}`))
    .catch(err=> console.log(err))

const Admin=models.Admin

// admin/signup
router.get('/signup',(req,res)=>{
    res.sendFile('/root/Desktop/web_dev/hackerrank_extension/backend/adminSignup.html')
})
router.post('/adminsignup',(req,res)=>{
    var hash=bcrypt.hashSync(req.body.password,2)
    req.body.password=hash
    var newAdmin= new Admin(req.body)
    newAdmin.save()
        .then((obj)=>{
            console.log(obj)
            res.sendFile('/root/Desktop/web_dev/hackerrank_extension/backend/adminlogin.html')
        })
        .catch(err=> {
            console.log('error while creating admin user')
            res.sendFile('/root/Desktop/web_dev/hackerrank_extension/backend/adminSignup.html')
        })
})

router.get('/adminlogin',(req,res)=>{
    res.sendFile('/root/Desktop/web_dev/hackerrank_extension/backend/adminlogin.html')
})

router.post('/adminlogin',(req,res)=>{
    Admin.findOne({username: req.body.username},(err,data)=>{
        if(err || !data) console.log('err.message')
        else{
            if(bcrypt.compareSync( req.body.password, data.password)==false){
                console.log('username and password don\'t match')
                res.sendFile('/root/Desktop/web_dev/hackerrank_extension/backend/adminlogin.html')
            }else{
                req.session.uid= data._id
                res.sendFile('/root/Desktop/web_dev/hackerrank_extension/backend/admindashboard.html')
            }
        }


    })
})

router.get('/updatetime',(req,res)=>{
    res.sendFile('/root/Desktop/web_dev/hackerrank_extension/backend/admindashboard.html')
})

router.post('/updateTime',(req,res)=>{
    var endtime=req.body.time *60*1000 + Date.now()
    req.body.time=endtime
    var testDuration= new Timer(req.body)
    console.log(req.body)
    testDuration.save()
        .then((obj)=>{
            console.log(obj)
            res.sendFile('/root/Desktop/web_dev/hackerrank_extension/backend/admindashboard.html')
        })
        .catch(err=>{
            console.log(err)
            res.sendFile('/root/Desktop/web_dev/hackerrank_extension/backend/admindashboard.html')
        })
})


module.exports= router

