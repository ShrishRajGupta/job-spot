const {Router} = require("express");
const router = Router();

const { adminJobForm, dashBoardPreviw, deleteBlog, previewUser } = require("../controllers/adminControllers");
const authenticateToken = require('../middleware/validateJWT');
const sendMail = require("../controllers/mail");
// Route begins with  ----------"/admin"---------

router.get("/",authenticateToken,dashBoardPreviw)
router.get("/jobpostform",authenticateToken,function(req,res){
    res.status(200).render('JobPostForm')
});

// Route for admin sending mail
router.get("/mail",sendMail);

// id = admin id in adminDB
router.get('/preview/:id',authenticateToken,previewUser)


router.post("/jobpostform",authenticateToken,adminJobForm)
// id = blog id in POST Model
router.get('/delete/:id',authenticateToken,deleteBlog)
module.exports = router;