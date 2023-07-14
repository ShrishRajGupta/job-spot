const express = require("express");
const router = express.Router();
const { mainDisplay, getJobById, postComment } = require("../controllers/mainController");
const { getRegisterForm, getLoginForm, loginCompany, registerCompany } = require("../controllers/companyControllers");
const authenticateToken = require('../middleware/validateJWT');

router.route('/')
    .get(mainDisplay)
    .post(authenticateToken, mainDisplay);

router.get('/logout', async (req, res) => {
    req.session=null;
    req.logOut();
    return res
        .clearCookie("authorization")
        .clearCookie('authorization.sig')
        .status(200)
        .redirect('/');
})

router.route('/company/login')
    .get(getLoginForm)
    .post(loginCompany)

router.route('/company/register')
    .get(getRegisterForm)
    .post(registerCompany)


// id = job id
router.get('/job-post/:id', authenticateToken, getJobById);



module.exports = router;