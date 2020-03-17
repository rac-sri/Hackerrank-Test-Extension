// const port = process.env.PORT || 3000;
const express = require('express');
const app = express();
const mongoose  = require('mongoose');
const config = require('config');
const user = require('./routes/user');
const auth = require('./routes/auth');
const report = require('./routes/report');
const allowed = require('./routes/allowed');

const port = 3000;
const dbConnectionString = 'mongodb://localhost/HackerRank_Extention';

mongoose.connect(dbConnectionString).then(()=>console.log('Connected to mongoDB')).catch((err)=>console.log('Couldnt connect to mongoDB',err));


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

console.log(config.get('invAuth'));//remove 

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");     
   next();
});

app.use('/test/reports',report);
app.use('/test/users',user);
app.use('/test/auth',auth);
app.use('/test/allowed',allowed);

app.listen(port,()=>console.log(`listening on port ${port}`));
