import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import { app } from "..";
import { prismaClient } from "../__mocks__/db";
vi.mock("../db");

describe("calculations of numbers", () => {
  describe("POST, /sum", () => {
    it("sum of 5,8 is 13", async () => {
      prismaClient.calculation.create.mockResolvedValue({
        id: 1,
        a: 5,
        b: 8,
        answer: 13,
        type: "sum",
      });
      vi.spyOn(prismaClient.calculation, "create");

      const res = await request(app).post("/sum").send({
        a: 5,
        b: 8,
      });

      expect(prismaClient.calculation.create).toHaveBeenCalledWith({
        data: {
          a: 5,
          b: 8,
          answer: 13,
          type: "sum",
        },
      });
      expect(res.statusCode).toBe(200);
      expect(res.body.answer).toBe(13);
    }),
      it("gettin 422 status code in incorrect Input", async () => {
        const res = await request(app).post("/sum").send({
          a: "four",
          b: 5,
        });
        expect(res.statusCode).toBe(422);
        expect(res.body.msg).toBe("User Inter inCorrect Input");
      });
    it("should return 500 if database error occurs", async () => {
      prismaClient.calculation.create.mockRejectedValueOnce(
        new Error("DB error")
      );

      const res = await request(app).post("/sum").send({
        a: 5,
        b: 8,
      });
      expect(res.status).toBe(500);
      expect(res.body.msg).toBe(
        "An error occurred while saving to the database."
      );
    });
  });
});
