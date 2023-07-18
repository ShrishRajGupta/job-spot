const { Router } = require("express");
const { loginUser,
    registerUser,
    getLoginForm,
    getRegisterForm,
    follow,
    unfollow } = require("../controllers/userController");
const authenticateToken = require("../middleware/validateJWT");
const router = Router();

// route begins with 'user'
router.route('/login')
    .get(getLoginForm)
    .post(loginUser)

router.route('/register')
    .get(getRegisterForm)
    .post(registerUser)
    
router.get('/follow/:userId', authenticateToken, follow);
router.get('/unfollow/:userId', authenticateToken, unfollow);

module.exports = router;
