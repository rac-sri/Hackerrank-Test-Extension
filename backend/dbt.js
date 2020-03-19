const express= require('express')
const mongoose=require('mongoose')
const models=require('./models')
const cors=require('cors')
const bodyParser= require('body-parser')

// not connecting to database
const dbt=express.Router()

mongoose.connect('mongodb://localhost/owasptestextension')
    .then((db)=>console.log(`connected`))
    .catch(err=> console.log(err))


dbt.use(bodyParser.json())
dbt.use(bodyParser.urlencoded({extended:true}))

dbt.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}));
const RaiseDoubt=models.RaiseDoubt

dbt.post('/submitdoubt',(req,res)=>{
    //console.log('received a post request at this end point')
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

dbt.get('/getDoubts',(req,res)=>{
    RaiseDoubt.find({},(err,data)=>{
        if(err) console.log(err.message)
        else{
            console.log('almost done')
            res.status(200).json({
                message:"Doubts kmkb",
                data: data
            })
        }


    })

})


module.exports=dbt