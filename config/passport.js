const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const Admin = require("../models/AdminModel");
let GoogleUser;

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL:  `${process.env.CLIENT_URL}/auth/google/jobspot`
},
async function(accessToken, refreshToken, profile, cb) {
  const {sub,name,email,picture}=profile._json;
  // console.log(profile._json);
  
  GoogleUser = profile;
  await Admin.findOrCreate({ 
    googleId:sub,username:name,email:email,picture:picture}, 
    function (err, user) {
    return cb(err, user);
  });
}
));


passport.serializeUser((user, cb)=> {
    process.nextTick(()=> {
        cb(null, { id: user.id,username:user.username,email:user.email });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

module.exports = {GoogleUser};
