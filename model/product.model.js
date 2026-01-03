const mongoose = require("mongoose");
const { flowerCategories } = require("../utils/constants");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
    enum: flowerCategories,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  image: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
