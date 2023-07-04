
const POST  = require("../models/PostModel");
// @routes = /
// @desc = Displays all jobs
const mainDisplay = async(req,res)=>{
    
    try {
        const jobs= await POST.find();
        if(!jobs){
            res.status(403)
            .json({ msg: "No jobs in DB" });
        }
        let val=true;
        if (req.cookies.authorization === undefined || req.cookies.authorization === null)
            val=false;
        res.status(200)
            .render('landingPage',{jobs,val});
    } catch (err) {
        console.log(err);  
        res.status(500).json({msg:"Server error"});      
    }
}

// @routes = /job-post/:id
// @desc = Displays specific job by id
const getJobById = async(req,res)=>{
    const id = req.params.id;
    try {
        const job=await POST.findById(id);
        if(!job)
            res.status(404).render('404');
        res.status(200).render('jobPreview',{article:job});
        
    } catch (err) {
        console.log(err);
        res.status(500).json({msg:"Server error"});      
    }
}

module.exports={
    mainDisplay,
    getJobById
}