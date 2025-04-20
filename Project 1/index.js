const express = require("express");

const { logReqRes } = require("./middleware");
const userRouter = require("./routes/users");

const { connectMongoDb } = require("./connection");

const app = express();
const port = 8000;

//connections
connectMongoDb("mongodb://127.0.0.1:27017/project-1").then(() =>
  console.log(`mongoDb is Connected`)
);
//Midleware

app.use(express.urlencoded({ extended: false }));

app.use(logReqRes("log.txt"));
//Routes
app.use("/api/users", userRouter);

app.listen(port, () => console.log(`server is running on port:${port}`));
