const express = require("express");
const app = express();
require('dotenv').config()
const cors = require("cors");
app.use(cors());
const port = 3000;
const dbConnect = require("./utils/db");
const userRouter = require("./router/user.router")
const productRouter = require("./router/product.router")
app.use(express.json());
app.use("/api/auth",userRouter);
app.use("/api/products",productRouter)


dbConnect();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// IddEo4TGY9QSUKAJ
// khushiagrawal