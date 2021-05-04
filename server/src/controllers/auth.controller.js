const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const tokenGenerator = require('../utils/token.generator');
// use `prisma` in your application to read and write data in your DB

async function register(req, res) {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    countyId,
    zip,
    languageId,
  } = req.body;

  try {
    // * Bcrypt user password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    // * Creating the user
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        password: bcryptPassword,
        countyId,
        zip,
        languageId,
      },
    });

    const token = tokenGenerator(newUser.id);

    if (newUser) {
      return res.json({
        msg: `The user '${firstName}' was succesfully registered.`,
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
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).send({ error: `Email or Password is incorrect.` });
    }

    // * Validate user password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).send({ error: `Email or Password is incorrect.` });
    }

    const token = tokenGenerator(user.id);

    return res.json({
      msg: `The user '${user.firstName}' was succesfully login.`,
      token,
    });
  } catch (error) {
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
