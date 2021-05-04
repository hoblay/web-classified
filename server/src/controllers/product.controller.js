const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createProduct(req, res) {
  const {
    name,
    description,
    brandId,
    price,
    pageTitle,
    metaKeywords,
    metaDescription,
  } = req.body;
  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        brandId,
        price,
        pageTitle,
        metaKeywords,
        metaDescription,
      },
    });

    if (newProduct) {
      return res.json({
        msg: `The Product '${name}' was succesfully created.`,
        data: newProduct,
      });
    }
  } catch (error) {
    return res.status(500).send({ error });
  }
}

async function getProduct(req, res) {
  let { id } = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        stock: true,
        brand: {
          select: {
            id: true,
            name: true,
          },
        },
        categories: {
          select: {
            id: true,
            name: true,
          },
        },
        colors: {
          include: {
            images: true,
            sizes: true,
          },
        },
      },
    });

    if (product) {
      return res.json({
        msg: `The Product was succesfully fetched.`,
        data: product,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

async function getProducts(req, res) {
  try {
    const allProducts = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        stock: true,
        brand: {
          select: {
            id: true,
            name: true,
          },
        },
        categories: {
          select: {
            id: true,
            name: true,
          },
        },
        colors: {
          include: {
            images: true,
            sizes: true,
          },
        },
      },
    });

    if (allProducts) {
      return res.json({
        msg: `The Products were succesfully fetched.`,
        data: allProducts,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}
// ? TODO
async function updateProduct(req, res) {
  let { id } = req.params;
  const { name, description } = req.body;

  try {
    const updatedProduct = await sql.query(
      'UPDATE products SET name = $1, description = $2 WHERE id = $3  RETURNING *',
      [name, description, id]
    );

    if (updatedProduct.rows[0]) {
      return res.json({
        msg: `The Product '${id}' was succesfully updated.`,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

async function deleteProduct(req, res) {
  let { id } = req.params;
  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });
    if (deletedProduct) {
      return res.json({
        msg: `The Product was succesfully deleted.`,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

async function addCategory(req, res) {
  let { id } = req.params;
  const { category } = req.body;
  try {
    const addedCategory = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        categories: {
          connect: { id: Number(category) },
        },
      },
    });

    if (addedCategory) {
      return res.json({
        msg: `The Category was succesfully added.`,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

async function addColor(req, res) {
  const { color, name } = req.body;
  let { id } = req.params;
  try {
    const newColor = await prisma.color.create({
      data: {
        productId: Number(id),
        name,
        color,
      },
    });

    if (newColor) {
      return res.json({
        msg: `The Color '${name}' was succesfully created.`,
        data: newColor,
      });
    }
  } catch (error) {
    return res.status(500).send({ error });
  }
}

async function removeColor(req, res) {
  const { id } = req.params;
  try {
    const deletedColor = await prisma.color.delete({
      where: {
        id: Number(id),
      },
    });
    if (deletedColor) {
      return res.json({
        msg: `The Color was succesfully deleted.`,
      });
    }
  } catch (error) {
    return res.status(500).send({ error: `Something went wrong.` });
  }
}

async function addImage(req, res) {
  let { id } = req.params;
  const { path, originalname } = req.file;
  try {
    const newImage = await prisma.image.create({
      data: {
        colorId: Number(id),
        img: path,
      },
    });
    if (newImage) {
      return res.json({
        msg: `The image '${originalname}' was succesfully uploaded.`,
        data: newImage,
      });
    }
  } catch (error) {
    return res.status(500).send({ error });
  }
}
async function removeImage(req, res) {
  const { id } = req.params;
  try {
    const deletedImage = await prisma.image.delete({
      where: {
        id: Number(id),
      },
    });
    if (deletedImage) {
      return res.json({
        msg: `The Image was succesfully deleted.`,
      });
    }
  } catch (error) {
    return res.status(500).send({ error });
  }
}

async function addSize(req, res) {
  let { id } = req.params;
  let { size } = req.body;
  try {
    const newSize = await prisma.size.create({
      data: {
        colorId: Number(id),
        size,
      },
    });
    if (newSize) {
      return res.json({
        msg: `The size '${size}' was succesfully uploaded.`,
        data: newSize,
      });
    }
  } catch (error) {
    return res.status(500).send({ error });
  }
}
async function removeSize(req, res) {
  const { id } = req.params;
  try {
    const deletedSize = await prisma.size.delete({
      where: {
        id: Number(id),
      },
    });
    if (deletedSize) {
      return res.json({
        msg: `The Size was succesfully deleted.`,
      });
    }
  } catch (error) {
    return res.status(500).send({ error });
  }
}

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  addCategory,
  addColor,
  removeColor,
  addImage,
  removeImage,
  addSize,
  removeSize,
};
