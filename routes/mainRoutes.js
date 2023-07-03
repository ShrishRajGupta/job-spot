const express = require("express");
const router = express.Router();
const { mainDisplay, getJobById } = require("../controllers/mainController");
const { getRegisterForm, getLoginForm, loginCompany, registerCompany } = require("../controllers/companyControllers");
const authenticateToken = require('../middleware/validateJWT');

router.get('/', mainDisplay);
router.route('/company/login')
    .get(getLoginForm)
    .post(loginCompany)

router.route('/company/register')
    .get(getRegisterForm)
    .post(registerCompany)


    
router.get('/job-post/:id',authenticateToken, getJobById);

module.exports = router;