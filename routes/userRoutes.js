const {Router} = require("express");
const { loginUser, registerUser, getLoginForm, getRegisterForm } = require("../controllers/userController");
const router = Router();

// route begins with 'user'
router.route('/login')
    .get(getLoginForm)
    .post(loginUser)

router.route('/register')
    .get(getRegisterForm)
    .post(registerUser)
module.exports = router;
