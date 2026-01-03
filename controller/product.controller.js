const Product = require("../model/product.model");
const { flowerCategories } = require("../utils/constants");

const uploadProduct = async (req, res) => {
  try {
    const product = req.body;
    const newProduct = new Product(product);
    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product uploaded successfully", product: newProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const {
      search = "",
      sort = "asc",
      page = 1,
      limit = 10,
      category = "all",
    } = req.query;
    const query = {
      name: { $regex: search, $options: "i" },
      category: category.toLowerCase() === "all" ? { $exists: true } : category,
    };
    const products = await Product.find(query)
      .sort({ price: sort === "asc" ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProductDeatails = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updatedProductDeatails,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = await Product.findByIdAndDelete(id);
    if (!deleteProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllCategories = async (req, res) => {
  try {
    // const categories = await Product.distinct("category");

    res.status(200).json({ categories: flowerCategories });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  uploadProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllCategories,
};
