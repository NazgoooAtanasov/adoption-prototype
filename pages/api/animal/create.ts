import z from "zod";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { generateErrorMessage } from "zod-error";
import { validateToken } from "../../../utils/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  const jwt_token = req.cookies.jwt_token;
  const { valid, payload } = validateToken(jwt_token);
  if (!valid) {
    return res.status(401).json({
      success: false,
      message:
        "Session expired, please log in as organization to be able to create gallery entries",
    });
  }

  if (payload?.role !== "ORGANIZATION") {
    return res.status(401).json({
      success: false,
      message: "Only organization accounts can create gallery entries",
    });
  }

  req.body.age = parseInt(req.body.age);

  const validator = z.object({
    name: z.string().nonempty("Name should not be empty"),
    description: z
      .string()
      .min(30, "Description should be at least 30 characters long."),
    gender: z.union([z.literal("male"), z.literal("female")]), // add gender error message
    type: z.string().nullable(),
    age: z.number().min(0, "Age is requried."),
    status: z
      .string()
      .min(15, "Pet health status should contain at least 15 characters."),
    location: z.string().nonempty("Location is a mandatroy field"),
  });

  const validation = validator.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      success: false,
      message: generateErrorMessage(validation.error.issues, {
        maxErrors: 1,
        path: { enabled: false },
        code: { enabled: false },
        message: { enabled: true, label: "" },
      }),
    });
  }

  let animal = null;
  try {
    const prisma = new PrismaClient();
    animal = await prisma.animal.create({
      data: {
        ...req.body,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "There was an error creating the gallery entry.",
    });
  }

  res
    .status(200)
    .json({ success: true, message: "Animal created.", animalId: animal.id });
}
