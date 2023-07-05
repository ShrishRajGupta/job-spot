require('dotenv').config()
const POST  = require("../models/PostModel");
const Admin = require('../models/AdminModel');
const UserDB = require('../models/UserModel.js');


// @routes = "/admin/jobpostform"
// @desc = Post req for companies to post blogs 
const adminJobForm = async(req,res)=>{
    const {jobTitle,titleDesc,skills,duration,stipend}=req.body;
    // Function to check for company
    const company_id= req.user.id;
    const admin=await Admin.findById(company_id);
    if(!admin){
        admin= await UserDB.findById(id);
        if(!admin)
            res.status(403).json({msg:"Unauthorized access"})
    }
   
    try {
        const form= new POST({
            user_id:req.user.id,
            jobTitle:jobTitle,
            jobDesc:titleDesc,
            skills: skills,
            duration: duration,
            stipend: stipend
        });
        await form.save();
        admin.posts.push(form);
        await admin.save();

        res.status(200).redirect('/admin');
    } catch (err) {
        console.log(err);
        res.status(500).json({msg:"Sever error"});        
    }
    
}
// @routes = "/admin"

const dashBoardPreviw = async(req,res)=>{
    const {id} = req.user;
    const admin= await Admin.findById(id);
    if(!admin){
        admin= await UserDB.findById(id);
        if(!admin)
            res.status(403).json({msg:"Unauthorized access"})
    }
    
    const postArr = [];
    const arr= admin.posts;

    await Promise.all (arr.map (async(ele)=>{
        if(ele!=null){

            
            let data = await POST.findById(ele.toString());
            postArr.push(data); // compromise on data security-
        }
    }))


    const personelData = {name:admin.username,email:admin.email,id:admin._id};
    res.status(200).render("DashBoard",{personelData,arr:postArr});
}


// @routes = "/admin/delete/:id"
// @desc = Delete req for companies to delete jobs
const deleteBlog = async (req,res)=>{
    const blog_id= req.params.id.toString();

    const post= await POST.findById(blog_id);
    if(post.user_id.toString() !== req.user.id.toString())
        res.status(403).json({msg:"Unauthorized access"});
    const c=await POST.findByIdAndDelete(blog_id);
    if(!c)
        res.status(500).json({msg:`server error // @routes = "/admin/delete/:id" `});
    res.status(200).redirect('/admin');
}
module.exports={
    adminJobForm,
    dashBoardPreviw,
    deleteBlog
}