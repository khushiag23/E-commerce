const cartRouter = require('express').Router();
const cartController = require('../controller/cart.controller');
const authorize = require('../middleware/authorize');

cartRouter.get("/", authorize,cartController.getCart);
cartRouter.post("/", authorize,cartController.addToCart);
cartRouter.put("/", authorize,cartController.updateCart);
cartRouter.delete("/", authorize,cartController.removeFromCart);

module.exports = cartRouter;
