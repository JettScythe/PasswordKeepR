const express = require("express");
const router = express.Router();


module.exports = (db) => {
  router.get('/', (req, res) => {
    const user = req.session.user_id;
    db.query(`SELECT * FROM users WHERE id = $1`, [user])
    .then(userInfo => {
      const info = userInfo.rows;
      res.json(info);
    }).catch(err => {
      console.log('error from /api/passwords/account_info:', err);
    })
  });

  return router;
};
