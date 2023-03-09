import { expect, test, describe } from "@jest/globals";
import request from "supertest";
import app from "../..";





describe("GET / - a simple api endpoint", () => {
    test("Hello API Request", async () => {
      const result = await request(app).get('/api/anime');
      expect(result.text).toEqual(2)      
    });
  });