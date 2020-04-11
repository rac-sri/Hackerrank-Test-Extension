const express = require('express');
const app = express();
const mongoose  = require('mongoose');
const config = require('config');
const socket = require('socket.io');

const report = require('./routes/report');
const candidate = require('./routes/candidate');
const invigilator = require('./routes/invigilator');

// const port = process.env.PORT || 3000;
const port = 3000;
const dbConnectionString = 'mongodb://localhost/HackerRank_Extention';


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

// console.log(config.get('invAuth'));//remove 
global.testURL = null;
app.use(express.json());
app.use(express.static('public'));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,x-auth-token,x-invAuth,x-username");     
   next();
});

app.use('/test/reports',report);
app.use('/test/candidate',candidate);
app.use('/test/invigilator',invigilator);

const server = app.listen(port,()=>console.log(`listening on port ${port}`));
const io = socket(server);
app.set('socketio',io);

