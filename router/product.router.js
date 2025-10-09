const productRouter = require("express").Router();
const productController = require("../controller/product.controller");
const isAdmin = require("../middleware/isAdmin");

productRouter.post("/upload", isAdmin, productController.uploadProduct);
productRouter.get("/", productController.getAllProducts);
productRouter.get("/:id", productController.getProductById);
productRouter.put("/:id", isAdmin, productController.updateProduct);
productRouter.delete("/:id", isAdmin, productController.deleteProduct);

module.exports = productRouter;
