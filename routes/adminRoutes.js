const express = require("express");
const bodyParser = require("body-parser");

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
    console.log(Jobtitle);
});

module.exports = router;