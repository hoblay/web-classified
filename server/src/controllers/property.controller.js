const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createProperty(req, res) {
  const { name, categoryId, unit, isMandatory, screenControlId } = req.body;
  try {
    const newProperty = await prisma.property.create({
      data: {
        name,
        categoryId: Number(categoryId),
        unit,
        isMandatory,
        screenControlId: Number(screenControlId),
      },
    });
    if (newProperty) {
      return res.json({
        msg: `The Property '${name}' was succesfully created.`,
        data: newProperty,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

async function getProperty(req, res) {
  let { id } = req.params;

  try {
    const property = await prisma.property.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (property) {
      return res.json({
        msg: `The property was succesfully fetched.`,
        data: property,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

async function getProperties(req, res) {
  try {
    const allProperty = await prisma.property.findMany();
    if (allProperty) {
      return res.json({
        msg: `The Property were succesfully fetched.`,
        data: allProperty,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

async function updateProperty(req, res) {
  let { id } = req.params;
  const { name, categoryId, unit, isMandatory, screenControlId } = req.body;

  try {
    const updatedProperty = await prisma.property.update({
      where: {
        id: Number(id),
      },
      data: {
        categoryId: Number(categoryId),
        unit,
        isMandatory,
        screenControlId: Number(screenControlId),
      },
    });

    if (updatedProperty) {
      return res.json({
        msg: `The Language '${updatedProperty.name}' was succesfully updated.`,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

async function deleteProperty(req, res) {
  let { id } = req.params;
  try {
    const deletedProperty = await prisma.property.delete({
      where: {
        id: Number(id),
      },
    });
    if (deletedProperty) {
      return res.json({
        msg: `The Brand was succesfully deleted.`,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

module.exports = {
  createProperty,
  getProperty,
  getProperties,
  updateProperty,
  deleteProperty,
};
