const express = require('express')
const app=express()
require('dotenv').config()
const bodyParser = require('body-parser')
const cookieParser=require('cookie-parser');

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


// 404
app.use((req, res, next) => {
  res.status(404).render('404');
})

const port = process.env.PORT||3000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });