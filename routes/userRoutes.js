const {Router} = require("express");
const { loginUser, registerUser, getLoginForm, getRegisterForm, follow } = require("../controllers/userController");
const authenticateToken = require("../middleware/validateJWT");
const router = Router();

// route begins with 'user'
router.route('/login')
    .get(getLoginForm)
    .post(loginUser)

router.route('/register')
    .get(getRegisterForm)
    .post(registerUser)
router.post('/follow/:userId',authenticateToken,follow);

module.exports = router;
