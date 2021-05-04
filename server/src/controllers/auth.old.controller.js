const sql = require('../database/database');
const bcrypt = require('bcrypt');
const tokenGenerator = require('../utils/token.generator');

async function register(req, res) {
  const { firstName, lastName, email, password } = req.body;

  try {
    // * Seeing if user exist
    const user = await sql.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    if (user.rows.length !== 0) {
      return res.status(401).send({ error: `User already exists.` });
    }

    // * Bcrypt user password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    // * Creating the user
    const newUser = await sql.query(
      'INSERT INTO users (first_name,last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [firstName, lastName, email, bcryptPassword]
    );

    const token = tokenGenerator(newUser.rows[0].user_id);

    if (newUser.rows[0]) {
      return res.json({
        msg: `The user '${email}' was succesfully registered.`,
        token,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    // * Seeing if user exist
    const user = await sql.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).send({ error: `Email or Password is incorrect.` });
    }

    // * Validate user password
    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(401).send({ error: `Email or Password is incorrect.` });
    }

    const token = tokenGenerator(user.rows[0].user_id);

    return res.json({
      msg: `The user '${email}' was succesfully login.`,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

async function verify(req, res) {
  try {
    return res.json(true);
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

module.exports = {
  register,
  login,
  verify,
};
