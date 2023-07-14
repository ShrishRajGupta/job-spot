require('dotenv').config()
const POST = require("../models/PostModel");
const Admin = require('../models/AdminModel');
const UserDB = require('../models/UserModel.js');

// @return = admin object
const adminDetails = async (id) => {
    let admin = await Admin.findById(id);
    if (!admin) {
        admin = await UserDB.findById(id);
        if (!admin)
            throw new Error({ msg: "Unauthorized access" });
    }
    return admin;

}

// @params = id of the admin in string
// @return = user_id,jobTitle,jobDesc
const postThumbnail = async (id) => {
    const admin = await adminDetails(id);
    const postArr = [];
    const arr = admin.posts;

    await Promise.all(arr.map(async (ele) => {
        let data = await POST.findById(ele.toString());
        if(data == 'undefined' || typeof data == 'undefined' || data == null || typeof data == null || data.length == 0){
            return postArr;
        }else {
            postArr.push({
                _id: data._id,
                jobTitle: data.jobTitle,
                jobDesc: data.jobDesc
            });
        }
    }));
    return postArr;

}

module.exports = {
    postThumbnail,
    adminDetails
}