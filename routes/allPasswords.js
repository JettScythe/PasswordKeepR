const express = require("express");
const router = express.Router();
const helper = require("../helpers");

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(
      `SELECT passwords.*, catagories.name AS catagory_name
      FROM passwords
      JOIN catagories ON catagories.id = passwords.catagory_id
      WHERE organization_id = $1
      ORDER BY catagory_id, website_name;`,
      [req.session["organization_id"]]
    )
      .then((data) => {
        const passwords = data.rows;

        res.json(passwords);
      })

      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/", async (req, res) => {
    const body = req.body;
    const orgID = req.session.organization_id;

    const categorySelect = await db.query(
      `SELECT id FROM catagories WHERE name = $1`,
      [body.category]
    );
    categoryID = categorySelect.rows[0].id;

    db.query(
      `INSERT INTO passwords (website_name, website_username, website_password, organization_id, catagory_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;`,
      [body.name, body.username, body.password, orgID, categoryID]
    )
      .then((res) => {
        return res.rows;
      })
      .catch((err) => console.log("error from post request:", err));
    // res.redirect('/passwords');
    res.send("success");
  });

  return router;
};
