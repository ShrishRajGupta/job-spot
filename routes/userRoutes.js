const express = require("express");
const { loginUser, registerUser, getLoginForm, getRegisterForm } = require("../controllers/userController");
const router = express.Router();


router.route('/login')
    .get(getLoginForm)
    .post(loginUser)

router.route('/register')
    .get(getRegisterForm)
    .post(registerUser)
module.exports = router;
