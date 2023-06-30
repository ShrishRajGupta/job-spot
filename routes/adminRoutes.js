const express = require("express");
const router = express.Router();

const { adminJobForm } = require("../controllers/adminControllers");

router.get("/",function(req,res){
    res.status(200).render("DashBoard");
});
router.get("/jobpostform",function(req,res){
    res.status(200).render("JobPostForm");
});

router.post("/jobpostform",adminJobForm)
module.exports = router;