const express = require("express");
const router = express.Router();

module.exports = (obj) => {
  router.get("/", (req, res) => {
    res.render("register");
  });
  router.post("/", (req, res) => {
    const users = {
      name: req.body.name,
      email: req.body.email,
      user_password: req.body.user_password,
      organization_id: Number(req.body.organization_id),
    };

    obj
      .getUserByEmail(users.email)
      .then((user) => {
        if (user) {
          return res.send("user already exists");
        }
        obj.addNewUser(users).then((user) => {
          return res.send("added user");
        });
      })

      .catch((err) => {
        console.error(err.message);
      });
  });
  return router;
};
