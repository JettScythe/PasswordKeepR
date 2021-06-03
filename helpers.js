const argon2 = require("argon2");
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

const addNewUser = async function (user) {
  try {
    const hash = await argon2.hash(user.user_password);
    const orgID = await db.query(
      `SELECT id FROM organizations WHERE name = $1`,
      [user.organization_name]
    );
    const newUser = await db.query(
      `INSERT INTO users(NAME, EMAIL, USER_PASSWORD, ORGANIZATION_ID)
    VALUES ($1, $2, $3, $4) RETURNING *;`,
      [user.name, user.email, hash, Number(orgID.rows[0]["id"])]
    );
    return newUser.rows[0];
  } catch (err) {
    console.log("error:", err.message);
  }
};
exports.addNewUser = addNewUser;

const getUserByEmail = async function (email) {
  try {
    const user = await db.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    if (user.rows.length === 0) {
      return null;
    }
    return user.rows[0];
  } catch (err) {
    console.log(err.message);
  }
};
exports.getUserByEmail = getUserByEmail;

const authenticateUser = async function (email, password) {
  try {
    let user = await getUserByEmail(email);
    if (await argon2.verify(user.user_password, password)) {
      return user;
    } else {
      user = null;
      return user;
    }
  } catch (err) {
    console.log(err.message);
  }
};
exports.authenticateUser = authenticateUser;

const updateUserEmail = async function (email, id) {
  try {
    const updatedUser = await db.query(
      `UPDATE users
    SET email = $1
    WHERE id = $2
    RETURNING *;`,
      [email, id]
    );
    return updatedUser;
  } catch (err) {
    console.error(err.message);
  }
};
exports.updateUserEmail = updateUserEmail;

const updateUserName = async function (name, id) {
  try {
    const updatedUser = await db.query(
      `UPDATE users
    SET name = $1
    WHERE id = $2
    RETURNING *;`,
      [name, id]
    );
    return updatedUser;
  } catch (err) {
    console.error(err.message);
  }
};
exports.updateUserName = updateUserName;

const updateUserPassword = async function (password, id) {
  try {
    const hash = await argon2.hash(password);
    const updatedUser = await db.query(
      `UPDATE users
    SET user_password = $1
    WHERE id = $2
    RETURNING *;`,
      [hash, id]
    );
    return updatedUser;
  } catch (err) {
    console.error(err.message);
  }
};
exports.updateUserPassword = updateUserPassword;

const getAllPasswords = async function (organization_id) {
  try {
    const passwords = await db.query(
      `SELECT * FROM PASSWORDS WHERE organization_id = $1`,
      [organization_id]
    );
    return passwords.rows;
  } catch (err) {
    console.error(err.message);
  }
};
exports.getAllPasswords = getAllPasswords;

const addNewPassword = async function (passwordObj, organization_id) {
  try {
    const newPassword = await db.query(
      `INSERT INTO passwords(WEBSITE_NAME, WEBSITE_USERNAME, WEBSITE_PASSWORD, ORGANIZATION_ID, CATAGORY_ID)
    VALUES($1, $2, $3, $4, $5) RETURNING *;`,
      [
        password.website_name,
        password.website_username,
        password.website_password,
        orgID,
        password.catagory_id,
      ]
    );
    return newPassword;
  } catch (err) {
    console.error(err.message);
  }
};
exports.addNewPassword = addNewPassword;

const findOrganizationName = async function (organization_id) {
  try {
    const organizationName = await db.query(
      `SELECT name FROM organizations WHERE id = $1`,
      [organization_id]
    );
    return organizationName;
  } catch (err) {
    console.error(err.message);
  }
};
exports.findOrganizationName = findOrganizationName;

const findCatagoryName = async function (catagory_id) {
  try {
    const catagoryName = await db.query(
      `SELECT name FROM catagories WHERE id = $1`,
      [catagory_id]
    );
    return catagoryName;
  } catch (err) {
    console.error(err.message);
  }
};
exports.findCatagoryName = findCatagoryName;
