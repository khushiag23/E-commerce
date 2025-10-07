const express = require("express");
const app = express();
require('dotenv').config()
const port = 3000;
const dbConnect = require("./utils/db");
const userRouter = require("./router/user.router")
app.use(express.json());
app.use("/api/users",userRouter);


dbConnect();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// IddEo4TGY9QSUKAJ
// khushiagrawal