const express = require('express');
const router = express.Router();

module.exports = (obj) => {

  router.get('/', async function (req, res) {
    orgID = req.session['organization_id'];
    const passwords = await obj.getAllPasswords(orgID)
    .then(result => {
      return result;
    })
    const templateVars = {
      user_id: req.session['user_id'],
      organization_id: req.session['organization_id'],
      passwords
    };
    res.render('passwords', templateVars);
  })
  return router;
};


