const express = require("express");
const server = express();

const postRouter = require("./posts/postRouter.js");
const userRouter = require("./users/userRouter.js");

const baseURL = "localhost:8000/";

server.use(logger);
server.use(express.json());
server.use("/api/posts", postRouter);
server.use("/api/users", userRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log({
    url: baseURL + req.url,
    method: req.method,
    time: Date.now()
  });
  next();
}

module.exports = server;
