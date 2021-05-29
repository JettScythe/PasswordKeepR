const express = require('express');
const router = express.Router();

module.exports = () => {

  router.get('/', (req, res) => {
    const templateVars = {
      user_id: req.session['user_id'],
      organization_id: req.session['organization_id']
    };
    res.render('passwords', templateVars);
  })
  return router;
};
