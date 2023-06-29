const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    name:{
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
    }
},{
    timestamps:true
});

module.exports = mongoose.model("Admin",adminSchema);