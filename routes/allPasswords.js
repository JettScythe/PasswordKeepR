const express = require('express');
const router  = express.Router();
const helper = require('../helpers');

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM passwords WHERE organization_id = $1;`, [req.session['organization_id']])
      .then(data => {
        const passwords = data.rows;
        res.json(passwords);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post('/', (req, res) => {
    console.log('it made it to here....', req.body);
    const body = req.body;
    const orgID = req.session.organization_id;

    db.query(`INSERT INTO passwords (website_name, website_username, website_password, organization_id, catagory_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;`,
      [body.name, body.username, body.password, orgID, 1]
    ).then(res => {
      return res.rows;
    }).catch(err => console.log('error from post request:', err));
    res.redirect('/passwords');
  });

  return router;
};
