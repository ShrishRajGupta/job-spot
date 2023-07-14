const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"UserDB"
    },
    username:{
        type:String,
        required:true
    },
    blog_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"POST"
    },
    comment:{
        type:String
    }
});

module.exports = mongoose.model("commentModel",commentSchema);