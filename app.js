require('dotenv').config()

const express = require('express')
const app=express()

const session = require("cookie-session");
const passport = require("passport");
const bodyParser = require('body-parser')
const cookieParser=require('cookie-parser');


// DB
const connectDB = require('./config/conn.js');
connectDB();

// Google Oauth starts
require("./config/passport.js");
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  name: 'authorization',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}))

app.use(passport.initialize());
app.use(passport.session());

// Google Oauth ends



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

//Routes after getting verified by google starts
app.use("/auth",require("./routes/auth.js"));

// Routes after getting verified by google ends
app.use('/',require('./routes/mainRoutes.js'))
app.use('/user',require('./routes/userRoutes.js'))
app.use("/admin",require("./routes/adminRoutes.js"));


// 404 route
app.use((req, res, next) => {
  res.status(404).render('404');
})

const port = process.env.PORT||3000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
 