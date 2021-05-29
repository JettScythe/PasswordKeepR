const argon2 = require('argon2');
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();


const addNewUser = async function(user) {
  const hash = await argon2.hash(user.user_pass);
  try {
    const newUser = await db.query(`INSERT INTO users(NAME, EMAIL, USER_PASS, ORGANIZATION_ID) 
    VALUES ($1, $2, $3, $4) RETURNING *;`, [user.name, user.email, hash, user.organization_id])
    return newUser.rows[0]
  } catch (err) {
    console.log(err.message);
  }
};
exports.addNewUser = addNewUser;

const getUserByEmail = async function(email) {
  try {
    const user = await db.query(`SELECT * FROM users WHERE email = $1`, [email])
    return user.rows[0];
  } catch (err) {
    console.log(err.message)
  }
};
exports.getUserByEmail = getUserByEmail;

const authenticateUser = async function(email, password) {
  // retrieve the user with that email
  try {
    let user = await getUserByEmail(email);
    if (await argon2.verify(user.user_pass, password)) {
      return user.rows[0]
    } else {
      user = null;
      return user;
    }
  } catch (err) {
    console.log(err.message)
  }
};
exports.authenticateUser = authenticateUser;