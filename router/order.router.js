const orderRouter = require('express').Router();
const orderController = require('../controller/order.controller');
const authorize = require('../middleware/authorize');

orderRouter.get("/", authorize,orderController.getOrders);
orderRouter.post("/", authorize,orderController.placeOrder);

module.exports = orderRouter;