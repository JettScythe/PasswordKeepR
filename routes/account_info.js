const express = require('express');
const router = express.Router();

module.exports = (db, obj) => {
  router.get('/', (req, res) => {
    const user = req.session.user_id;
    db.query(`SELECT users.*, organizations.name as org_name FROM users
    JOIN organizations ON organizations.id = organization_id
    WHERE users.id = $1;`, [user])
    .then(userInfo => {
      const info = userInfo.rows[0];
      info.user_id = info.id;
      console.log(info);
      res.render('account_info', info);
    }).catch(err => {
      console.log('error from /api/passwords/account_info:', err);
    })
  });

  router.post('/email', (req, res) => {
    const id = req.session.user_id;
    const { email } = req.body;
    obj.updateUserEmail(email, id);
    res.send();
  })

  router.post('/name', (req, res) => {
    const id = req.session.user_id;
    const { name } = req.body;
    console.log('the new name is:', name);
    obj.updateUserName(name, id);
    res.send();
  })

  router.post('/password', (req, res) => {
    const id = req.session.user_id;
    const { password } = req.body;
    obj.updateUserPassword(password, id);
    res.send();
  })

  return router;
}
