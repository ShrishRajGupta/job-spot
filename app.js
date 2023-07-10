require('dotenv').config()

const express = require('express')
const app=express()

const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const bodyParser = require('body-parser')
const cookieParser=require('cookie-parser');
const Admin = require("./models/AdminModel");

// Google Oauth starts
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  }); 
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});
let GoogleUser;
passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/jobspot"
},
function(accessToken, refreshToken, profile, cb) {
  console.log(profile);
  GoogleUser = profile;
  Admin.findOrCreate({ googleId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}
));
module.exports = {GoogleUser};
// Google Oauth ends

// DB
const connectDB = require('./config/conn.js');
connectDB();

// middleware & statics
app.use(express.static('public'))
app.use(express.json());
// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser());

// template engine  
app.set('view engine','ejs')
app.set('views','./views')

// Routes
app.use('/',require('./routes/mainRoutes.js'))
app.use('/user',require('./routes/userRoutes.js'))
app.use("/admin",require("./routes/adminRoutes.js"));

//Routes after getting verified by google starts
app.get("/auth/google",
    passport.authenticate("google",{scope: ["profile"]})
);
app.get("/auth/google/jobspot", 
  passport.authenticate("google", { failureRedirect: '/company/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  });
//Routes after getting verified by google ends

// 404
app.use((req, res, next) => {
  res.status(404).render('404');
})

const port = process.env.PORT||3000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
 