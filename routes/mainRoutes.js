const express = require("express");
const router = express.Router();
const { mainDisplay, getJobById, postComment } = require("../controllers/mainController");
const { getRegisterForm, getLoginForm, loginCompany, registerCompany } = require("../controllers/companyControllers");

router.get('/', mainDisplay);
router.post('/', mainDisplay);

router.get('/logout',async(req,res)=>{
    return res
    .clearCookie("authorization")
    .status(200)
    .redirect('/');
})
const authenticateToken = require('../middleware/validateJWT');

router.route('/company/login')
    .get(getLoginForm)
    .post(loginCompany)

router.route('/company/register')
    .get(getRegisterForm)
    .post(registerCompany)



    router.get('/job-post/:id',authenticateToken, getJobById);
    router.post('/job-post/:id',authenticateToken,postComment);
    

module.exports = router;