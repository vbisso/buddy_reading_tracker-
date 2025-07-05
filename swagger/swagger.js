const swaggerAutogen = require("swagger-autogen")();

//Dynamically choose host
const isRender = process.env.RENDER === "true";
process.env.RENDER_EXTERNAL_HOSTNAME || false;
const host = isRender ? "buddy-reading-tracker.onrender.com" : "localhost:3000";

console.log("Using host:", host);

const doc = {
  info: {
    title: "Buddy Reading Tracker API",
    description: "API for managing books, users, progress, and notes",
  },
  host: host,
  schemes: [isRender ? "https" : "http"],
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description: "Enter JWT as: Bearer <token>",
    },
  },
  security: [{ bearerAuth: [] }],
};

const outputFile = "./swagger/swagger-output.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
