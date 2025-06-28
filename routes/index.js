const routes = require("express").Router();
const bookRouter = require("./books");
const swaggerRouter = require("./swagger");

routes.get("/", (req, res) => {
  res.send("Welcome to the Buddy Reading Tracker API!");
});

routes.use("/api-docs", swaggerRouter);

routes.use("/books", bookRouter);

module.exports = routes;
