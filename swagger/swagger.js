const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Buddy Reading Tracker API",
    description: "API for managing books, users, progress, and notes",
  },
  host: "localhost:3000", // Change this to your Render domain when deploying
  schemes: ["http"], // Use https if deploying to Render
};

const outputFile = "./swagger/swagger-output.json";
const endpointsFiles = ["./server.js", "./routes/books.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
