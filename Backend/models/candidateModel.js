const mongoose = require('mongoose'); 

const candidateSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required: true
    },
    details:{
        type: [
            { URL: {type: String } , timestamp: {type: Date, default:Date.now()} ,_id:false}
        ],
        required: true
    }
});

const Candidate = mongoose.model('report', candidateSchema);



module.exports.Candidate = Candidate;
