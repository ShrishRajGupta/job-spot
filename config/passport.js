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
  const {sub,name,email}=profile._json;
  
  GoogleUser = profile;
  await Admin.findOrCreate({ 
    googleId:sub,username:name,email:email}, 
    function (err, user) {
    return cb(err, user);
  });
}
));


passport.serializeUser((user, cb)=> {
    process.nextTick(()=> {
        cb(null, { id: user.id });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

module.exports = {GoogleUser};
