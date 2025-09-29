require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");
const { notFound, defaultError } = require("./middleware");
const userRouter = require("./routers/user.router");
const sendMail = require("./sendMail/mailSender");

// app initialization
const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
  sendMail(
    "sultanasaria45@gmail.com, arshakhan320@gmail.com",
    "Test Message",
    "242345"
  );
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
