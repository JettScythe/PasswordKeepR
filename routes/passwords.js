const express = require('express');
const router = express.Router();

module.exports = (obj) => {

  const isLoggedIn = function(req) {
    if (req.session.organization_id) return req.session.organization_id;
    return false;
  }

  router.get('/', async function (req, res) {
    const orgID = isLoggedIn(req);

    if (orgID) {
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
    } else {
      res.redirect('/');
    }

  })
  return router;
};


