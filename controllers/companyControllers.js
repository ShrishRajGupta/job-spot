const bcrypt = require('bcryptjs')
require('dotenv').config()
const Admin = require('../models/AdminModel');
const { checkF } = require('../middleware/generateJWT');


const getRegisterForm = async(req,res)=>{
    res.status(200).render('register',{path:'company',alt:'user'});
}

//@desc = a post request to register new user
//response = 
const registerCompany = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) 
            res.status(400).redirect('/company/register');// redirect to register

        //Checking DB for unique Admin
        const existingUser = await Admin.findOne({ email:email });
        if (existingUser)
            res.redirect('/company/login'); // redirect to login

        // hashing and salting password
        let salt = bcrypt.genSaltSync(10);
        let hashPasscode = bcrypt.hashSync(password, salt);

        // Storing data of user
        const member = await Admin.create({
            username, email, password: hashPasscode,
        });

        // Token generation and storage
        member.token = checkF(member);
        return res.cookie("authorization", member.token, {httpOnly: true,
                secure: true,
            })
            .status(200).redirect('/');
    }
    catch (err) {
        console.log(err);
        res.status(500).json({msg:"Server error REGISTER"}) // render 500
    }
};


const getLoginForm = async (req,res)=>{
    res.status(200).render('login',{path:'company',alt:'user'});
}

//@desc = a get request to verify logged in user 
//response = 
const loginCompany = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password)
            res.status(400).redirect('/company/login'); // redirect to login


        //Checking DB for unique Admin and passwd
        const user = await Admin.findOne({ email });
        if (!user)
            return res.status(401).redirect('/company/login'); // redirect to login

        const check = await bcrypt.compare(password, user.password);
        if (!check)
            return res.status(401).redirect('/company/login'); // redirect to login

        // Generation of JWT
        if (user && check) {
            user.token = checkF(user);
            return res
                .cookie("authorization", user.token, {httpOnly: true,
                    secure: true,
                })
                .status(200).redirect('/');
        } else {
            res.status(401).redirect('/company/register'); // redirect to register
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
    loginCompany,
    registerCompany
}