const express = require("express");
const router = express.Router();
const addNewUser = require("../helpers")

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("register");
  });
  router.post("/", (req, res) => {
    addNewUser();
    res.redirect("/");
  });
  return router;
};


