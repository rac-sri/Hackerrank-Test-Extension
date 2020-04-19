const express = require('express');
const app = express();
const mongoose  = require('mongoose');
const config = require('config');
const socket = require('socket.io');
const helmet = require('helmet'); 
const compression = require('compression'); 

const report = require('./routes/report');
const candidate = require('./routes/candidate');
const invigilator = require('./routes/invigilator');
const invgPage = require('./routes/invgPage');


// const port = 3000;
const dbConnectionString = config.get('db');
// console.log(dbConnectionString);
// console.log(config.get('invPass')) 


mongoose.connect(dbConnectionString,{useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>console.log('Connected to mongoDB'))
    .catch((err)=>console.log('Couldnt connect to mongoDB',err));


process.on('uncaughtException',(ex)=>{
    console.log('Uncaught Exception...',ex);
    process.exit(1);
});

process.on('unhandledRejection',(ex)=>{
    console.log('Unhandled Rejection...',ex);
    process.exit(1);
});


if(!config.get('jwtPrivateKey') ){
    throw new Error('FATAL ERROR:jwtPrivateKey not found');
}


global.testURL = null;
app.use(express.json());
app.use(express.static('public'));
app.use(helmet());
app.use(compression());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,x-auth-token,x-username");     
   next();
});
app.use('/',invgPage);
app.use('/test/reports',report);
app.use('/test/candidate',candidate);
app.use('/test/invigilator',invigilator);


const port = process.env.PORT || 3000;
const server = app.listen(port,()=>console.log(`listening on port ${port}`));
const io = socket(server);
app.set('socketio',io);
