const express = require('express');
const router = express.Router();

module.exports = (obj) => {

  router.post('/', (req, res) => {
    const {email, password} = req.body;
    obj.authenticateUser(email, password)
    .then(user => {
      console.log('user:', user);
      if (!user) {
        res.send('wrong password');
        return;
      }
      req.session['user_id'] = user.id;
      res.send(user);
      console.log('logged in successfully');
      res.redirect('/passwords');
    })
    .catch(e => res.send(e));
  })
  return router;
};
