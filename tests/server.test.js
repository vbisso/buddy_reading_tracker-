const request = require("supertest");
const app = require("../server");

describe("Server route", () => {
  it("responds to root route", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
});
