const mongoose = require("mongoose");

const postModel = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Admin"
    },
    jobTitle:{
        type:String,
        required:[true,"ENTER THE JOB TITLE"]
    },
    jobDesc:{
        type:String,
        required:[true,"ENTER JOB DESCRIPTION"]
    },
    skills:{
        type:String,
        required:[true,"ENTER THE SKills"]
    },
    duration:{
        type:String,
        required:[true,"DURATION"]
    },
    stipend:{
        type:String,
        required:[true,"ENTER THE STIPEND"]
    },
    likes:[{
        type:String,
    }],
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'commentModel'
    }]

});

module.exports = mongoose.model("POST",postModel);