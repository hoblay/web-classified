module.exports = function (req, res, next) {
  const { firstName, lastName, email, password } = req.body;

  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path === '/register') {
    console.log(!email.length);
    console.log(firstName, lastName, email, password);
    if (![firstName, lastName, email, password].every(Boolean)) {
      return res.status(401).send({ error: `Missing Credentials.` });
    } else if (!validEmail(email)) {
      return res.status(401).send({ error: `Invalid Email.` });
    }
  } else if (req.path === '/login') {
    if (![email, password].every(Boolean)) {
      return res.status(401).send({ error: `Missing Credentials.` });
    } else if (!validEmail(email)) {
      return res.status(401).send({ error: `Invalid Email.` });
    }
  }

  next();
};
