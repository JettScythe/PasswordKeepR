const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post('/', (req, res) => {
    body = req.body;
    console.log("website body: ", body.website)
    db.query(`DELETE FROM passwords WHERE website_name = $1`, [body.website])
    .then(data => {
      console.log(data);
    });
    res.send('');
  })
  return router;
};