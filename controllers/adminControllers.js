const env = require('dotenv').config()
const POST  = require("../models/PostModel");

const adminJobForm = async(req,res)=>{
    const {jobTitle,titleDesc,skills,duration,stipend}=req.body;
    try {
        const form= await POST.create({
            jobTitle:jobTitle,
            jobDesc:titleDesc,
            skills: skills,
            duration: duration,
            stipend: stipend
        })
        res.status(200).json(form);
    } catch (err) {
        console.log(err);
        res.status(500).json({msg:"Sever error"});        
    }
    
}

module.exports={
    adminJobForm
}