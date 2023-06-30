const express = require("express");
const bodyParser = require("body-parser");
const POST  = require("../models/PostModel");
const router = express.Router();
const urlEncodedParser = bodyParser.urlencoded({extended: false});
router.get("/",function(req,res){
    res.render("DashBoard");
});
router.get("/jobpostform",function(req,res){
    res.render("JobPostForm");
});

router.post("/jobpostform",urlEncodedParser,function(req,res){
    const Jobtitle = req.body.jobTitle;
    const JobDesc = req.body.titleDesc;
    const skills = req.body.skills;
    const duration = req.body.duration;
    const stipend = req.body.stipend;
    const post = new POST({
        JobTitle:Jobtitle,
        JobDesc:JobDesc,
        Skills: skills,
        Duration: duration,
        Stipend: stipend
    })
    post.save();
});

module.exports = router;