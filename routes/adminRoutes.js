const express = require("express");
const router = express.Router();

const { adminJobForm } = require("../controllers/adminControllers");
const authenticateToken = require('../middleware/validateJWT');

router.get("/",function(req,res){
    res.status(200).render("DashBoard");
});
router.get("/jobpostform",authenticateToken,function(req,res){
    res.status(200).render("JobPostForm");
});

router.post("/jobpostform",authenticateToken,adminJobForm)
module.exports = router;