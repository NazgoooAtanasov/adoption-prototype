import { PrismaClient, Role, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { generateErrorMessage } from "zod-error";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ success: boolean; message?: string; token?: string }>
) {
  const prisma = new PrismaClient();
  const body: {
    email: string;
    password: string;
    role: Role;
  } = req.body;

  const validator = z.object({
    email: z
      .string()
      .nonempty("Email should be filled")
      .email("The email is not valid"),

    password: z
      .string()
      .min(5, "Password should contain at least 5 characters"),
  });

  const validation = validator.safeParse(body);

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

  let user: User | null = null;
  try {
    user = await prisma.user.findFirst({
      where: {
        email: body.email,
        role: body.role,
      },
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message:
        "There was an error trying to find that user. Please try again later.",
    });
  }

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "User with that email and role does not exist.",
    });
  }

  const isPasswordValid = await bcrypt.compare(body.password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      success: false,
      message: "You have provided the wrong password for that user.",
    });
  }

  const jwt_secret = process.env.JWT_SECRET;
  const token = jwt.sign({ email: body.email, role: body.role }, jwt_secret!, {
    expiresIn: "1h",
  });
  res
    .status(200)
    .json({ success: true, token: token, message: "Successfully authorized." });
}
