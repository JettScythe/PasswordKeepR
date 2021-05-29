const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("register");
  });
  router.post("/", (req, res) => {
    console.log("new user");
    res.redirect("/");
  });
  return router;
};
