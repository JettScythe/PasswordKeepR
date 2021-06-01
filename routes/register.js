const express = require("express");
const router = express.Router();

module.exports = (obj) => {
  router.get("/", (req, res) => {
    const templateVars = {
      user_id: req.session["user_id"],
    };
    res.render("register", templateVars);
  });
  router.post("/", (req, res) => {
    const users = {
      name: req.body.name,
      email: req.body.email,
      user_password: req.body.user_password,
      organization_name: req.body.organization_name,
    };

    obj
      .getUserByEmail(users.email)
      .then((user) => {
        if (user) {
          return res.send("user already exists");
        }
        obj.addNewUser(users).then((user) => {
          req.session["user_id"] = user.id;
          req.session["organization_id"] = user.organization_id;
          return res.redirect("/passwords");
        });
      })

      .catch((err) => {
        console.error(err.message);
      });
  });
  return router;
};
