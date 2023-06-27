import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { generateErrorMessage } from "zod-error";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;

  const validatior = z.object({
    firstname: z.string().nonempty("First name is required"),
    lastname: z.string().nonempty("Last name is requried"),
    email: z.string().email("The email should be valid"),
    description: z.string(),
  });

  const validation = validatior.safeParse(body);

  if (!validation.success) {
    res.status(400).json({
      success: false,
      message: generateErrorMessage(validation.error.issues, {
        maxErrors: 1,
        path: { enabled: false },
        code: { enabled: false },
        message: { enabled: true, label: "" },
      }),
    });
  }

  try {
    const prisma = new PrismaClient();
    await prisma.request.create({
      data: { ...body },
    });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Error in creating adoption request." });
  }

  res
    .status(201)
    .json({ success: true, message: "Successfully created a request" });
}
