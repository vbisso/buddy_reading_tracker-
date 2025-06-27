const express = require("express");
const { connect } = require("./config/db");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger/swagger-output.json");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello, world!");
});
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/", require("./routes"));

connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
});
