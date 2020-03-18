const express= require('express')
const mongoose=require('mongoose')
const app=express()
const models=require('./models')
const cors=require('cors')
const bodyParser= require('body-parser')
const adm= require('./admin')

// not connecting to database
app.use('/admin',adm)

mongoose.connect('mongodb://localhost/owasptestextension')
    .then((db)=>console.log(`connected to ${db}`))
    .catch(err=> console.log(err))


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}));
const RaiseDoubt=models.RaiseDoubt

app.post('/submitdoubt',(req,res)=>{
    var dbt=new RaiseDoubt(req.body)
    console.log(dbt)
    dbt.save()
        .then(()=>RaiseDoubt.find({question:13},(err,data)=>{
            res.send(data)
        }))
        .catch(err=> {
            res.send(err.message)

        })

})


app.get('/admin.html',(req,res)=>{

    res.sendFile('/root/Desktop/web_dev/hackerrank_extension/backend/admin.html')
})

app.get('/ad.html',(req,res)=>{
    res.sendFile('/root/Desktop/web_dev/hackerrank_extension/backend/ad.html')
})
const Timer=models.Timer
app.post('/timer',(req,res)=>{

    var timer= new Timer(req.body)
    timer.save()
        .then(()=> console.log('saved'))
        .catch(err=> console.log(err))
})

app.get('/ext',(req,res)=>{
            Timer.find({},(err,data)=>{
                if(err) {
                    console.log(err.message);
                }

                res.status(200).json({
                message:"its working",
                data: data[data.length-1]
            })})

        }


)

app.listen(8001)

