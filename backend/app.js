const express= require('express')
const mongoose=require('mongoose')
const app=express()
const models=require('./models')
const cors=require('cors')
const bodyParser= require('body-parser')
const adm= require('./admin')
const dbt=require('./dbt')


app.use('/',dbt)
app.use('/admin',adm)

mongoose.connect('mongodb://localhost/owasptestextension')
    .then((db)=>console.log(`connected`))
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
//const RaiseDoubt=models.RaiseDoubt


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
//const RaiseDoubt=models.RaiseDoubt
// app.get('/getDoubts',(req,res)=>{
//     RaiseDoubt.find({},(err,data)=>{
//         if(err) console.log(err.message)
//         else{
//             console.log('almost done')
//             res.status(200).json({
//                 message:"Doubts kmkb",
//                 data: data
//             })
//         }


//     })

// })

app.listen(8001)

