const argon2 = require("argon2");
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

const addNewUser = async function (user) {
  try {
    const hash = await argon2.hash(user.user_password);
    const orgID = await db.query(`SELECT id FROM organizations WHERE name = $1`, [user.organization_name])
    const newUser = await db.query(
      `INSERT INTO users(NAME, EMAIL, USER_PASSWORD, ORGANIZATION_ID)
    VALUES ($1, $2, $3, $4) RETURNING *;`,
      [user.name, user.email, hash, Number(orgID.rows[0]['id'])]
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
      // console.log("this bitch is undefined");
      return null;
    }
    return user.rows[0];
  } catch (err) {
    console.log(err.message);
  }
};
exports.getUserByEmail = getUserByEmail;

const authenticateUser = async function (email, password) {
  // retrieve the user with that email
  try {
    let user = await getUserByEmail(email);
    if (await argon2.verify(user.user_password, password)) {
      console.log("authenticate user success!");
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

const getAllPasswords = async function (organization_id) {
  try {
    const passwords = await db.query(`SELECT * FROM PASSWORDS WHERE organization_id = $1`, [organization_id]);
    return passwords.rows;
  } catch (err) {
    console.error(err.message);
  }
};
exports.getAllPasswords = getAllPasswords;


// generate char codes
const genCharCodes = (num1, num2) => {
  let result = [];
  for (let i = num1; i <= num2; i++) {
    result.push(i);    
  }
  return result;
}

const generatePassword = (options) => {
  const lowercase = genCharCodes(97, 122);
  const uppercase = genCharCodes(65, 90);
  const numbers = genCharCodes(48, 57);
  const symbols = genCharCodes(33, 47).concat(genCharCodes(58, 64)).concat(genCharCodes(91, 96)).concat(genCharCodes(123, 126));
  let draftPass;
  if (options.contains_lowercase) {
    draftPass = draftPass.concat(lowercase);
  }
  if (options.contains_uppercase) {
    draftPass = draftPass.concat(uppercase)
  }
  if (options.contains_numbers) {
    draftPass = draftPass.concat(numbers);
  }
  if (options.contains_symbols) {
    draftPass = draftPass.concat(symbols);
  }
  const finalPass = [];
  for (let i = 0; i < options.password_length; i++) {
    const charCodes = genCharCodes[Math.floor(Math.random() * draftPass.length)];
    finalPass.push(String.fromCharCode(charCodes));
  }
  return finalPass.join('');
};
exports.generatePassword = generatePassword;


const addNewPassword = async function(passwordObj, organization_id) {
  try {
    const newPassword = await db.query(`INSERT INTO passwords(WEBSITE_NAME, WEBSITE_USERNAME, WEBSITE_PASSWORD, ORGANIZATION_ID, CATAGORY_ID)
    VALUES($1, $2, $3, $4, $5) RETURNING *;`, [password.website_name, password.website_username, password.website_password, orgID, password.catagory_id]);
    return newPassword;
  } catch (err) {
    console.error(err.message)
  }
};
exports.addNewPassword = addNewPassword;
