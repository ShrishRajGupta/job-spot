const mongoose = require("mongoose");

const commentModel = mongoose.Schema({
    comment:{
        type:String
    }
});

module.exports = mongoose.model("commentPost",commentModel);