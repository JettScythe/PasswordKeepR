const express = require("express");
const router = express.Router();

module.exports = (db, obj) => {
  router.get("/", (req, res) => {
    const user = req.session.user_id;
    db.query(
      `SELECT users.*, organizations.name as org_name FROM users
    JOIN organizations ON organizations.id = organization_id
<<<<<<< HEAD
    WHERE users.id = $1;`, [user])
    .then(userInfo => {
      const info = userInfo.rows[0];
      info.user_id = info.id;
      res.render('account_info', info);
    }).catch(err => {
      console.log('error from /api/passwords/account_info:', err);
    })
=======
    WHERE users.id = $1;`,
      [user]
    )
      .then((userInfo) => {
        const info = userInfo.rows[0];
        info.user_id = info.id;
        res.render("account_info", info);
      })
      .catch((err) => {
        console.log("error from /api/passwords/account_info:", err);
      });
>>>>>>> 85ac7c98da348b9e7a9c947e7597e9832b981f15
  });

  router.post("/email", (req, res) => {
    const id = req.session.user_id;
    const { email } = req.body;
    obj.updateUserEmail(email, id);
    res.send();
  });

  router.post("/name", (req, res) => {
    const id = req.session.user_id;
    const { name } = req.body;
    obj.updateUserName(name, id);
    res.send();
  });

  router.post("/password", (req, res) => {
    const id = req.session.user_id;
    const { password } = req.body;
    obj.updateUserPassword(password, id);
    res.send();
  });

  return router;
};
