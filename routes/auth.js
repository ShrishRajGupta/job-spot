const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/google",
    passport.authenticate("google",{scope: ["profile","email"]})
);
router.get("/google/jobspot", 
  passport.authenticate("google", { failureRedirect: '/company/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  });
module.exports = router;
