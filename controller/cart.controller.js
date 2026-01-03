const Cart = require("../model/cart.model");

const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId }).populate("products.productId");
    return res.status(200).json({ cart });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ userId });
    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productId
      );
      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
      await cart.save();
    } else {
      const newCart = new Cart({
        userId,
        products: [{ productId, quantity }],
      });
      await newCart.save();
    }
    return res
      .status(200)
      .json({ message: "Product added to cart successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );
    if (productIndex === -1) {
        return res.status(404).json({ message: "Product not found in cart" });
    }
    cart.products[productIndex].quantity = quantity;
    await cart.save();
    return res.status(200).json({ message: "Cart updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        const productIndex = cart.products.findIndex(
            (p) => p.productId.toString() === productId
        );
        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart" });
        }
        cart.products.splice(productIndex, 1);
        await cart.save();
        return res.status(200).json({ message: "Product removed from cart successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
};
