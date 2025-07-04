const routes = require("express").Router();
const bookRouter = require("./books");
const highlightsNotesRouter = require("./highlightsNotes");
const readingProgressRouter = require("./readingProgress");
const userRouter = require("./users");
const swaggerRouter = require("./swagger");

routes.get("/", (req, res) => {
  res.send("Welcome to the Buddy Reading Tracker API!");
});

routes.use("/api-docs", swaggerRouter);

routes.use("/books", bookRouter);

routes.use("/users", userRouter);

routes.use("/highlightnotes", highlightsNotesRouter);

routes.use("/readingprogress", readingProgressRouter);

module.exports = routes;
