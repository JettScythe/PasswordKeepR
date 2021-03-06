// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require("morgan");
const cookieSession = require("cookie-session");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
// app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  "/styles",
  sass({
    src: __dirname + "/styles",
    dest: __dirname + "/public/styles",
    debug: true,
    outputStyle: "expanded",
  })
);
app.use(express.static("public"));
app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);

const obj = require("./helpers");

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const registerRoutes = require("./routes/register");
const loginRoutes = require("./routes/login");
const passwordRoutes = require("./routes/passwords");
const logoutRoutes = require("./routes/logout");
const passwordsNewRoutes = require("./routes/allPasswords");
const editPasswordRoutes = require("./routes/editPasswords");
const api_account_info_routes = require("./routes/api_account_info_routes");
const account_info_routes = require("./routes/account_info");
const deletePasswordRoutes = require("./routes/deletePassword");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/login", loginRoutes(obj));
app.use("/register", registerRoutes(obj));
app.use("/passwords", passwordRoutes(obj));
app.use("/logout", logoutRoutes());
app.use("/passwords/new", passwordsNewRoutes(db));
app.use("/passwords/edit", editPasswordRoutes(db));
app.use("/api/passwords/account_info", api_account_info_routes(db));
app.use("/passwords/account_info", account_info_routes(db, obj));
app.use("/passwords/delete", deletePasswordRoutes(db));

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  const isLoggedIn = function (req) {
    if (req.session.organization_id) return req.session.user_id;
    return false;
  };
  const user_id = isLoggedIn(req);

  if (user_id) {
    res.redirect("/passwords");
  } else {
    res.render("index", { error: false });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
