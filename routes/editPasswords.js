const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.post('/', (req, res) => {
    const body = req.body;

    console.log('edit password function took us here');
    console.log(body);

    if (body.username) {
      console.log('updating....');
      db.query(`UPDATE passwords SET website_username = $1 WHERE website_name = $2 RETURNING *;`, [body.username, body.website])
    }

    if (body.password) {
      db.query(`UPDATE passwords SET website_password = $1 WHERE website_name = $2 RETURNING *;`, [body.password, body.website])
    }

    if (body.username && body.password) {
      db.query(`UPDATE passwords SET website_username = $1, website_password = $2 WHERE website_name = $3 RETURNING *;`, [body.username, body.password, body.website])
    }
    res.send("success");
  })

  return router;
};
