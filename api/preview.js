require('dotenv').config()
const POST  = require("../models/PostModel");
const Admin = require('../models/AdminModel');
const UserDB = require('../models/UserModel.js');

// @return = admin object
const adminDetails = async(id)=>{
    let admin= await Admin.findById(id);
    if(!admin){
        admin= await UserDB.findById(id);
        if(!admin)
            throw new Error ({msg:"Unauthorized access"});
    }
    return admin;

}

// @params = id of the admin in string
// @return = user_id,jobTitle,jobDesc
const postThumbnail= async(id)=>{
    const admin= await adminDetails(id);
    const postArr = [];
    const arr= admin.posts;
    if(arr == 'undefined' || typeof arr == 'undefined' || arr == null || arr.length == 0)
        return postArr;
    await Promise.all (arr.map (async(ele)=>{
        if(ele!=null){            
            let data = await POST.findById(ele.toString());
            postArr.push({_id:data._id,jobTitle:data.jobTitle,jobDesc:data.jobDesc}); 
        }
    }));
    return postArr;

}

module.exports={
    postThumbnail,
    adminDetails
}