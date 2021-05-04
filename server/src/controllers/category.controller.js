const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createCategory(req, res) {
  const { name, parentId, maxImgs, postValidityIntervalInDays } = req.body;
  try {
    const newCategory = await prisma.category.create({
      data: {
        name,
        parentId: Number(parentId),
        maxImgs,
        postValidityIntervalInDays,
      },
    });

    if (newCategory) {
      return res.json({
        msg: `The Category '${name}' was succesfully created.`,
        data: newCategory,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

async function getCategory(req, res) {
  let { id } = req.params;

  try {
    const category = await prisma.category.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
        maxImgs: true,
        postValidityIntervalInDays: true,
        parent: {
          select: {
            id: true,
            name: true,
          },
        },
        children: {
          select: {
            id: true,
            name: true,
          },
        },
        properties: {
          select: {
            id: true,
            name: true,
            unit: true,
            isMandatory: true,
            values: {
              select: {
                id: true,
                value: true,
              },
            },
            screenControl: {
              select: {
                id: true,
                screenControl: true,
              },
            },
          },
        },
        posts: {
          select: {
            id: true,
            createdAt: true,
            lastRenewedAt: true,
            title: true,
            detail: true,
            isActive: true,
            isSeller: true,
            isIndividual: true,
            expectedPrice: true,
            isPriceNegotiable: true,
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                county: {
                  select: {
                    id: true,
                    name: true,
                    city: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
              },
            },
            images: {
              select: {
                id: true,
                name: true,
                url: true,
              },
            },
          },
        },
      },
    });

    if (category) {
      return res.json({
        msg: `The Category was succesfully fetched.`,
        data: category,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

async function getCategories(req, res) {
  try {
    const allCategories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        maxImgs: true,
        postValidityIntervalInDays: true,
        parent: {
          select: {
            id: true,
            name: true,
          },
        },
        children: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (allCategories) {
      return res.json({
        msg: `The categories were succesfully fetched.`,
        data: allCategories,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

async function updateCategory(req, res) {
  let { id } = req.params;
  const { name, parentId, maxImgs, postValidityIntervalInDays } = req.body;

  try {
    const updatedCategory = await prisma.category.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        parentId: Number(parentId),
        maxImgs,
        postValidityIntervalInDays,
      },
    });

    if (updatedCategory) {
      return res.json({
        msg: `The Category '${updatedCategory.name}' was succesfully updated.`,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

async function deleteCategory(req, res) {
  let { id } = req.params;
  try {
    const deletedCategory = await prisma.category.delete({
      where: {
        id: Number(id),
      },
    });
    if (deletedCategory) {
      return res.json({
        msg: `The Category was succesfully deleted.`,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

module.exports = {
  createCategory,
  getCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
