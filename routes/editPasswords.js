const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.post('/', (req, res) => {
    const username = req.body.website_username;
    const password = req.body.website_password;
    const website = req.body.website_name;

    console.log('HELLO')

    if (username) {
      db.query(`UPDATE passwords SET website_username = $1 WHERE website_name = $2 RETURNING *;`, [username, website])
    }

    if (password) {
      db.query(`UPDATE passwords SET website_password = $1 WHERE website_name = $2 RETURNING *;`, [password, website])
    }

    if (username && password) {
      db.query(`UPDATE passwords SET website_username = $1, website_password = $2 WHERE website_name = $3 RETURNING *;`, [username, password, website])
    }
    res.redirect('/passwords');
  })
  
  return router;
};
