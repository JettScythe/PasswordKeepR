const express = require('express');
const { DatabaseError } = require('pg-protocol');
const router = express.Router();
// const cookieSession = require('cookie-session');

// const app = express();
// app.use(cookieSession({
//   name: 'session',
//   keys: ['key1']
// }));

module.exports = (obj) => {

  router.post('/', (req, res) => {
    // console.log('cookie:', req.session);
    const {email, password} = req.body;
    obj.authenticateUser(email, password)
    .then(user => {
      console.log('user:', user);
      if (!user) {
        res.send('wrong password');
        return;
      }
      // req.session.userId = user.id;
      console.log('logged in successfully');
      res.redirect('/passwords');
    })
    .catch(e => res.send(e));
  })
  return router;
};
