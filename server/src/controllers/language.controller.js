const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createLanguage(req, res) {
  const { name } = req.body;
  try {
    const newLanguage = await prisma.language.create({
      data: {
        name,
      },
    });
    if (newLanguage) {
      return res.json({
        msg: `The Language '${name}' was succesfully created.`,
        data: newLanguage,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

async function getLanguage(req, res) {
  let { id } = req.params;

  try {
    const language = await prisma.language.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (language) {
      return res.json({
        msg: `The Language was succesfully fetched.`,
        data: language,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

async function getLanguages(req, res) {
  try {
    const allLanguages = await prisma.language.findMany();
    if (allLanguages) {
      return res.json({
        msg: `The Languages were succesfully fetched.`,
        data: allLanguages,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

async function updateLanguage(req, res) {
  let { id } = req.params;
  const { name } = req.body;

  try {
    const updatedLanguage = await prisma.language.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
      },
    });

    if (updatedLanguage) {
      return res.json({
        msg: `The Language '${updatedLanguage.name}' was succesfully updated.`,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

async function deleteLanguage(req, res) {
  let { id } = req.params;
  try {
    const deletedLanguage = await prisma.language.delete({
      where: {
        id: Number(id),
      },
    });
    if (deletedLanguage) {
      return res.json({
        msg: `The Brand was succesfully deleted.`,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

module.exports = {
  createLanguage,
  getLanguage,
  getLanguages,
  updateLanguage,
  deleteLanguage,
};
