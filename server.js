const express = require("express");
const { connect } = require("./config/db");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger/swagger-output.json");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");

require("./config/passport");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(
  cookieSession({
    name: "session",
    keys: [process.env.COOKIE_KEY || "key"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Fake Auth for testing
if (process.env.USE_FAKE_AUTH === "true") {
  const fakeAuthRoutes = require("./routes/fakeAuth");
  app.use("/fakeauth", fakeAuthRoutes);
  console.log("Using fake auth for testing.");
}

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/", require("./routes"));

connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
});
