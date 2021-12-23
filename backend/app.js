const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

//Router middleware

// const userRouter = require("./routes/userRoutes");
const videoRouter = require("./routes/videoRoutes");
const questionRouter = require("./routes/questionRoutes");

//morgan
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cors());

// #hi there i am sahaj



//Routes

// app.use("/api/v1/users", userRouter);
app.use("/api/v1/video", videoRouter);
app.use("/api/v1/question", questionRouter);

module.exports = app;
