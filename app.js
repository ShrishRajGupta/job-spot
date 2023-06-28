const express = require('express')
const app=express()
const port = process.env.PORT||3000;

// DB
const connectDB = require('./config/conn.js');
connectDB();

// template engine  
app.set('view engine','ejs')
app.set('views','./views')

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });