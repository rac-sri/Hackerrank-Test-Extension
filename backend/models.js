const mongoose=require('mongoose')

const raise= mongoose.Schema({
    // doubt raising will be done anonymously
    question: String,
    description: String,
    time:{
        type:Date,
        default: Date.now()
    }
})

const timer= mongoose.Schema({
    date:{
        type: Date,
        default: Date.now()
    },
    time: String
})

const adminSchema= mongoose.Schema({
    username: String,
    password: String
})

const Timer=mongoose.model('Timer',timer)
const RaiseDoubt=mongoose.model('RaiseDoubt',raise)
const Admin=mongoose.model('Admin',adminSchema)

module.exports={
    RaiseDoubt: RaiseDoubt,
    Timer: Timer,
    Admin: Admin

}