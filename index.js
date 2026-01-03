const express = require("express");
const app = express();
require('dotenv').config()
const cors = require("cors");
app.use(cors());
const port = 3000;
const dbConnect = require("./utils/db");


const userRouter = require("./router/user.router")
const productRouter = require("./router/product.router")
const cartRouter = require("./router/cart.router")
const orderRouter = require("./router/order.router")


app.use(express.json());
app.use("/api/auth",userRouter);
app.use("/api/products",productRouter)
app.use("/api/cart",cartRouter)
app.use("/api/orders",orderRouter)


dbConnect();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// IddEo4TGY9QSUKAJ
// khushiagrawal