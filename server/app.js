require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");
const { notFound, defaultError } = require("./middleware");
const userRouter = require("./routers/user.router");
const cookieParser = require("cookie-parser");

// const crypto = require("crypto");

// app initialization
const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(cookieParser());

// routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// user routes
app.use("/api/v1/users", userRouter);

app.use(notFound); // handle 404 errors
app.use(defaultError); // handle default errors

// start server
app.listen(PORT, () => {
  // connect to database before starting the server
  connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
