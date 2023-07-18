const {Router} = require("express");
const router = Router();

const { adminJobForm, dashBoardPreviw, deleteBlog, previewUser } = require("../controllers/adminControllers");
const authenticateToken = require('../middleware/validateJWT');
// Route begins with  ----------"/admin"---------

router.get("/",authenticateToken,dashBoardPreviw)
router.get("/jobpostform",authenticateToken,function(req,res){
    res.status(200).render('JobPostForm')
});

// id = admin id in adminDB
router.get('/preview/:id',authenticateToken,previewUser)


router.post("/jobpostform",authenticateToken,adminJobForm)
// id = blog id in POST Model
router.get('/delete/:id',authenticateToken,deleteBlog)
module.exports = router;