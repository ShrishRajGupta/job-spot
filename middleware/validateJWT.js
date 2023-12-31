const jwt = require('jsonwebtoken');
require('dotenv').config()

const secretKey = process.env.ACCESS_TOKEN;

const authenticateToken = (req, res, next) => {

    if (req.isAuthenticated()) { return next() }
    else { 
        console.log(`Not authenticated via passport`);
    }
    const token = req.cookies.authorization;

    if (!token) {
        console.log(`Token not found`);
        res.redirect('/user/register');
    }

    try {
        // Verify the token and decode its payload
        const decodedToken = jwt.verify(token, secretKey);
        req.user = decodedToken.user; 
        console.log(`Token verified via JWT`);
        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        return res.status(403)
        .json({ message: 'Invalid token' }); // redirect to /
    }
}

module.exports = authenticateToken;
