const express = require("express");
const router = express.Router();

module.exports = (obj) => {
  router.post("/", (req,res) => {
    console.log('request when generating pass:', req);
    res.send("Success")
  })
  return router;
}
