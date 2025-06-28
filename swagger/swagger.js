const swaggerAutogen = require("swagger-autogen")();

//Dynamically choose host
const isRender = process.env.RENDER === "true";
const host = isRender ? "buddy-reading-tracker.onrender.com" : "localhost:3000";

const doc = {
  info: {
    title: "Buddy Reading Tracker API",
    description: "API for managing books, users, progress, and notes",
  },
  host: host,
  schemes: [isRender ? "https" : "http"],
};

const outputFile = "./swagger/swagger-output.json";
const endpointsFiles = ["./server.js", "./routes/index.js"];
swaggerAutogen(outputFile, endpointsFiles, doc);
