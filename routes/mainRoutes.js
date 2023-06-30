const express = require("express");
const { mainDisplay, getJobById } = require("../controllers/mainController");
const router = express.Router();

router.get('/',mainDisplay);
router.get('/job-post/:id',getJobById);

module.exports =router;