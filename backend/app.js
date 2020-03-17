const express= require('express')
const mongoose=require('mongoose')
const app=express()
const models=require('./models')
const cors=require('cors')

// not connecting to database
mongoose.connect('mongodb://localhost/owasptestextension')
    .then((db)=>console.log(`connected to ${db}`))
    .catch(err=> console.log(err))

app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}));
const RaiseDoubt=models.RaiseDoubt

app.post('/submitdoubt',(req,res)=>{
    var dbt=new RaiseDoubt({
        question: 1,
        description: "eikwurfhd"
    })
    console.log(req.body) // undefined
    dbt.save()
        .then(()=>alert('doubt submitted'))
        .catch(err=> console.log('error occured while submitting doubt'))// saving error: maybe due to improper db connection

})
app.get('/admin.html',(req,res)=>{

    res.sendFile('/root/Desktop/web_dev/hackerrank_extension/backend/admin.html')
})

app.get('/ad.html',(req,res)=>{
    res.sendFile('/root/Desktop/web_dev/hackerrank_extension/backend/ad.html')
})
const Timer=models.Timer
app.post('/timer',(req,res)=>{
    console.log(req.body)//undefined
    var timer= new Timer({
        time:56
    })
    timer.save()
        .then(()=> console.log('saved'))
        .catch(err=> console.log(err))
})

app.get('/ext',(req,res)=>{
    Timer.find({},(err,data)=>{
        if(err) console.log('error occured wtf')
        else {
            res.status(200).json({
                message:"its working",
                time: data
            })
        }
    })

})

app.listen(8001)

