const bcrypt = require('bcryptjs')
require('dotenv').config()
const UserDB = require('../models/UserModel.js');
const { checkF } = require('../middleware/generateJWT.js');


const getRegisterForm = async(req,res)=>{
    res.status(200).render('register',{path:'user',alt:'company'});
}

//@desc = a post request to register new user
// @
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) 
            res.status(400).redirect('/user/register');

        //Checking DB for unique UserDB
        const existingUser = await UserDB.findOne({ email:email });
        if (existingUser)
            res.redirect('/user/login'); 

        // hashing and salting password
        let salt = bcrypt.genSaltSync(10);
        let hashPasscode = bcrypt.hashSync(password, salt);

        // Storing data of user
        const member = await UserDB.create({
            username, email, password: hashPasscode,
        });

        // Token generation and storage
        const token = checkF(member);
        return res.cookie("authorization", token, {httpOnly: true,
                secure: true,
            })
            .status(200).redirect('/');
    }
    catch (err) {
        console.log(err);
        res.status(500).json({msg:"Server error"}) // render 500
    }
};

//@desc = a get request to verify logged in user 
const getLoginForm = async (req,res)=>{
    res.status(200).render('login',{path:'user',alt:'company'});
}

//@desc = a post request to verify logged in user 
const loginUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password)
            res.status(400).redirect('/user/login'); // redirect to login


        //Checking DB for unique UserDB and passwd
        const user = await UserDB.findOne({ email });
        if (!user)
            return res.status(401).redirect('/user/login'); // redirect to login

        const check = await bcrypt.compare(password, user.password);
        if (!check)
            return res.status(401).redirect('/user/login'); // redirect to login

        // Generation of JWT
        if (user && check) {
            const token  = checkF(user)
            return res
                .cookie("authorization", token, {httpOnly: true,
                    secure: true,
                })
                .status(200).redirect('/');
        } else {
            res.status(401).redirect('/user/register'); // redirect to register
            throw new Error('Validation Error');
        }
        // token generated
    }
    catch (err) {
        console.log(err); // render to 500
        res.status(500).json({msg:"Server error"}) // render 500
    }
};

module.exports = {
    getLoginForm,
    getRegisterForm,
    loginUser,
    registerUser
}