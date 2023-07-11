const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");
const adminSchema = new mongoose.Schema({
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
        // required:[true,"Enter your Password"]
    },
    googleId:{
        type:String
    },
    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'POST'
    }]
},{
    timestamps:true
});
adminSchema.plugin(findOrCreate);
module.exports = mongoose.model("Admin",adminSchema);