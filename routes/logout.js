const express = require('express');
const router  = express.Router();

router.post("/logout", (req, res) => {
  // deletes cookie
  req.session = null;
  //redirect home
  res.redirect("/");
});