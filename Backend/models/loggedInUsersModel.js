const mongoose = require('mongoose');

const loggedINUserSchema = {
    token:{
        type:String,
        required:true
    }
} 
const LoggedINUser = mongoose.model('loggedIN',loggedINUserSchema);

module.exports.LoggedINUser = LoggedINUser;
module.exports.loggedINUserSchema = loggedINUserSchema;

