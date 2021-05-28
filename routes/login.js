const express = require('express');
const router = express.Router();

module.exports = () => {
  router.post('/', (req, res) => {
    console.log('logged in successfully');
    res.send('success!');
  })
  return router;
};
