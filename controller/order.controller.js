const Order = require("../model/order.model");

const getOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Order.find({ userId }).populate("products.productId");
        return res.status(200).json({ orders });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const placeOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { products, totalPrice, shippingAddress, contactNumber } = req.body;
        const newOrder = new Order({ userId, products, totalPrice, shippingAddress, contactNumber });
        await newOrder.save();
        return res.status(201).json({ message: "Order placed successfully", order: newOrder });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
  getOrders,
  placeOrder,
};

