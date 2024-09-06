import express from "express";
export const app = express();
import { z } from "zod";
import { prismaClient } from "./db";

app.use(express.json());

const inputSchem = z.object({
  a: z.number(),
  b: z.number(),
});

app.post("/sum", async function (req, res) {
  const validation = inputSchem.safeParse(req.body);
  if (!validation.success) {
    return res.status(422).json({
      msg: "User Inter inCorrect Input",
    });
  }
  try {
    const calciData = await prismaClient.calculation.create({
      data: {
        a: validation.data.a,
        b: validation.data.b,
        answer: validation.data.a + validation.data.b,
        type: "sum",
      },
    });

    return res.status(200).json({
      answer: calciData.answer,
      id: calciData.id,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "An error occurred while saving to the database.",
    });
  }
});
