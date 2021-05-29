const express = require('express');
const router = express.Router();
// const cookieSession = require('cookie-session');

// const app = express();
// app.use(cookieSession({
//   name: 'session',
//   keys: ['key1']
// }));

module.exports = () => {

  router.get('/', (req, res) => {
    res.render('passwords');
  })
  return router;
};
