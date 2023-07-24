require("dotenv");
const nodemailer = require("nodemailer");

//@route description = mail to every user who follow admin 
// route = /admin/mail

const sendMail = async (req,res) => {
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user: "ay143488@gmail.com",
            pass: process.env.password
        }
    });
    
    const details = {
        from:"ay143488@gmail.com",
        to:"ay143488@gmail.com",
        subject:"WEB DEVELOPER",
        text:"APPLY NOW"
    };
    
    transporter.sendMail(details,(err)=>{
            if(err){
                console.log(err);
            }else{
                console.log("MESSAGE SENT");
            }
    });
    res.redirect("/");
};

module.exports = sendMail;
