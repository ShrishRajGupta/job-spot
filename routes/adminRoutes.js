const express = require("express");
const router = express.Router();

const { adminJobForm, dashBoardPreviw, deleteBlog } = require("../controllers/adminControllers");
const authenticateToken = require("../middleware/validateJWT");


// Route begins with  ----------"/admin"---------

router.get("/",authenticateToken,dashBoardPreviw)
router.get("/jobpostform",authenticateToken,function(req,res){
    res.status(200).render('JobPostForm')
});

router.post("/jobpostform",authenticateToken,adminJobForm)
router.get('/delete/:id',authenticateToken,deleteBlog)
module.exports = router;