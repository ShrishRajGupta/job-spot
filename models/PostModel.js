const mongoose = require("mongoose");
const commentPost = require("../models/commentModel");

const postModel = mongoose.Schema({
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
    comment:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'commentPost'
    }

});

module.exports = mongoose.model("POST",postModel);