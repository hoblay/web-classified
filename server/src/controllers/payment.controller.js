const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createCurrency(req, res) {
  const { code, exchangeRate } = req.body;
  try {
    const newCurrency = await prisma.currency.create({
      data: {
        code,
        exchangeRate,
      },
    });
    if (newCurrency) {
      return res.json({
        msg: `The Currency '${code}' was succesfully created.`,
        data: newCurrency,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

async function deleteCurrency(req, res) {
  const { id } = req.params;
  try {
    const deletedCurrency = await prisma.currency.delete({
      where: {
        id: Number(id),
      },
    });

    if (deletedCurrency) {
      return res.json({
        msg: `The Currency '${deletedCurrency.code}' was succesfully deleted.`,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

module.exports = {
  createCurrency,
  deleteCurrency,
};
