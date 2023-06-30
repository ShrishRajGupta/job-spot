const mongoose = require("mongoose");

const postModel = mongoose.Schema({
    JobTitle:{
        type:String,
        required:[true,"ENTER THE JOB TITLE"]
    },
    JobDesc:{
        type:String,
        required:[true,"ENTER JOB DESCRIPTION"]
    },
    Skills:{
        type:String,
        required:[true,"ENTER THE SKills"]
    },
    Duration:{
        type:String,
        required:[true,"DURATION"]
    },
    Stipend:{
        type:String,
        required:[true,"ENTER THE STIPEND"]
    }
});

module.exports = mongoose.model("POST",postModel);