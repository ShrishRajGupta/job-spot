const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
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
    },
    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'POST'
    }]
},{
    timestamps:true
});

module.exports = mongoose.model("Admin",adminSchema);