const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function user(req, res) {
  try {
    // Returns an object or null
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
      },
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: `Something went wrong.` });
  }
}
async function profile(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        adresses: true,
      },
    });

    if (user) {
      return res.json({
        msg: `The User was succesfully fetched.`,
        data: user,
      });
    } else {
      return res.status(404).send({ error: `Couldn't find the user` });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

async function getUser(req, res) {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        adresses: true,
      },
    });

    if (user) {
      return res.json({
        msg: `The User was succesfully fetched.`,
        data: user,
      });
    } else {
      return res.status(404).send({ error: `Couldn't find the user` });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

async function getAll(req, res) {
  try {
    const allUsers = await prisma.user.findMany({
      select: {
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
      },
    });

    if (allUsers) {
      return res.json({
        msg: `The Users was succesfully fetched.`,
        data: allUsers,
      });
    } else {
      return res.status(404).send({ error: `Couldn't find any users` });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

async function createAdress(req, res) {
  const { adress1, adress2, city, country, province, adressType } = req.body;
  const { id } = req.user;
  try {
    const newAdress = await prisma.adress.create({
      data: {
        userId: Number(id),
        adress1,
        adress2,
        city,
        country,
        province,
        adressType,
      },
    });
    console.log(newAdress);
    if (newAdress) {
      return res.json({
        msg: `The adress '${newAdress.adressType}' was succesfully created.`,
        data: newAdress,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

async function deleteAdress(req, res) {
  const { id } = req.params;
  try {
    const deletedAdress = await prisma.adress.delete({
      where: {
        id: Number(id),
      },
    });
    cosole.log(deletedAdress);
    if (deletedAdress) {
      return res.json({
        msg: `The Adress was succesfully deleted.`,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

module.exports = {
  user,
  profile,
  getUser,
  getAll,
  createAdress,
  deleteAdress,
};
