const express = require('express');
const { DatabaseError } = require('pg-protocol');
const router = express.Router();



module.exports = (obj) => {

  router.post('/', (req, res) => {
    const {email, password} = req.body;
    obj.authenticateUser(email, password)
    .then(user => {
      console.log('user:', user);
      if (!user) {
        res.send({error: "error"});
        return;
      }
      req.session['user_id'] = user.id;
      res.send(user);
    })
    .catch(e => res.send(e));
  })
  return router;
};
