const express = require("express");
const { connect } = require("./config/db");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello, world!");
});
app.use(express.json());
app.use("/", require("./routes"));

connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
});
