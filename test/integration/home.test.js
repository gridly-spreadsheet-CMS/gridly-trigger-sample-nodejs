"use strict";

const supertest = require("supertest");

const server = require("../../src/server");

describe("Home", () => {
  const request = supertest(server.listen());

  describe("GET /", () => {
    it("<200> should always return with the API server information", async () => {
      const res = await request
        .get("/")
        .expect("Content-Type", /json/)
        .expect(200);

      const { status, data, message } = res.body;
      const expected = ["name", "version", "description", "author"];
      expect(status).toBe("success");
      expect(message).toBe(
        "I'm a sample for how to handle trigger changes from Gridly."
      );
      expect(Object.keys(data)).toEqual(expect.arrayContaining(expected));
    });
  });
});
