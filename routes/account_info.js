const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    const user = req.session.user_id;
    db.query(`SELECT users.*, organizations.name as org_name FROM users
    JOIN organizations ON organizations.id = organization_id
    WHERE users.id = $1;`, [user])
    .then(userInfo => {
      console.log(userInfo.rows);
      const info = userInfo.rows[0];
      info.user_id = info.id;
      res.render('account_info', info);
    }).catch(err => {
      console.log('error from /api/passwords/account_info:', err);
    })
  });

  return router;
}
