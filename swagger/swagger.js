const swaggerAutogen = require("swagger-autogen")();

//Dynamically choose host
const isRender = process.env.RENDER === "true";
const host = isRender ? "cse341-tpkb.onrender.com" : "localhost:3000";

const doc = {
  info: {
    title: "Buddy Reading Tracker API",
    description: "API for managing books, users, progress, and notes",
  },
  host: host,
  schemes: [isRender ? "https" : "http"],
};

const outputFile = "./swagger/swagger-output.json";
const endpointsFiles = ["./server.js", "./routes/books.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
