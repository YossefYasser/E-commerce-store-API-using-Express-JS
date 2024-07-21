const router = require("express").Router();
const Order = require("../models/Order");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyIsAdmin,
} = require("../middleware/verifyToken");

//CREATE ORDER

router.post("/", verifyToken, async (req, res) => {
  const order = new Order(req.body);
  try {
    const newOrder = await order.save();
    res.status(200).json(newOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE ORDER

router.put("/:id", verifyIsAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE ORDER

router.delete("/:id", verifyIsAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order Deleted Succssfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER ORDERS

router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const userOrders = await Order.find({ userId: req.params.userId });
    res.status(200).json(userOrders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL ORDER FOR ADMIN

router.get("/", verifyIsAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET MONTHLY INCOME

router.get("/income", verifyIsAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
