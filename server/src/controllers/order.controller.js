const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createOrder(req, res) {
  const {
    adressId,
    shippingCost,
    total,
    discountAmount,
    notes,
    products,
  } = req.body;
  const { id } = req.user;
  try {
    const newOrder = await prisma.order.create({
      data: {
        userId: Number(id),
        adressId,
        shippingCost,
        total,
        discountAmount,
        notes,
      },
    });

    products.forEach(async (product) => {
      const addProduct = await prisma.orderProducts.create({
        productId: product.id,
        amount: product.amount,
        orderId: newOrder.id,
      });
    });

    if (newOrder) {
      return res.json({
        msg: `The Order was succesfully created.`,
        data: newOrder,
      });
    }
  } catch (error) {
    return res.status(500).send({ error });
  }
}

async function getOrder(req, res) {
  let { id } = req.params;

  try {
    const order = await prisma.order.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        products: true,
      },
    });

    if (order) {
      return res.json({
        msg: `The Brand was succesfully fetched.`,
        data: order,
      });
    }
  } catch (error) {
    return res.status(500).send({ error });
  }
}

module.exports = {
  createOrder,
  getOrder,
};
