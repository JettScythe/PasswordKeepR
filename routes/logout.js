const express = require('express');
const router  = express.Router();


module.exports = () => {
  router.post("/", (req, res) => {
    // deletes cookie
    req.session = null;
    //redirect home
    res.redirect("/");
  });
  return router;
};