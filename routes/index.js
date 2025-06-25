const routes = require("express").Router();
const bookRouter = require("./books");

routes.use("/books", bookRouter);

module.exports = routes;
