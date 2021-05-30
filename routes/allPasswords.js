const express = require('express');
const router  = express.Router();

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
  return router;
};
