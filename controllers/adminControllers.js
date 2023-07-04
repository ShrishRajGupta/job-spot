require('dotenv').config()
const POST  = require("../models/PostModel");
const Admin = require('../models/AdminModel');

// @routes = "/jobpostform"
// @desc = Post req for companies to post blogs 
const adminJobForm = async(req,res)=>{
    const {jobTitle,titleDesc,skills,duration,stipend}=req.body;
    // Function to check for company
    const company_id= req.user.id;
    const check=await Admin.findById(company_id);
    if(!check)
        res.status(401).json({msg:"Only company are allowed"});
    try {
        const form= await POST.create({
            user_id:req.user.id,
            jobTitle:jobTitle,
            jobDesc:titleDesc,
            skills: skills,
            duration: duration,
            stipend: stipend
        })
        form.save();
        res.status(200).redirect('/');
    } catch (err) {
        console.log(err);
        res.status(500).json({msg:"Sever error"});        
    }
    
}

module.exports={
    adminJobForm
}