const express = require("express");
const router = express.Router();

module.exports = (obj) => {
  router.post("/", (req, res) => {
    const { email, password } = req.body;
    obj
      .authenticateUser(email, password)
      .then((user) => {
        console.log("user:", user);
        if (!user) {
          res.render("index.ejs", { error: true });
          return;
        }
        req.session["user_id"] = user.id;
        req.session["organization_id"] = user.organization_id;

        res.redirect("/passwords");
      })
      .catch((e) => res.send(e));
  });
  return router;
};
