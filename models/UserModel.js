const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required:[true,"Enter your name"]
    },
    email:{
        type: String,
        required:[true,"ENTER YOUR EMAIL"]
    },
    password:{
        type:String,
        required:[true,"Enter your Password"]
    },
    token:{
        type:String
    }
},{
    timestamps:true
});

module.exports = mongoose.model("UserDB",userSchema);