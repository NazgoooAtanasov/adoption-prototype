import { PrismaClient, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { generateErrorMessage } from "zod-error";
import bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ success: boolean; message: string }>
) {
  const prisma = new PrismaClient();
  const body: User = req.body;

  switch (body.role) {
    case "USER":
      const userValidator = z.object({
        email: z
          .string()
          .nonempty("Organization name should be filled")
          .email("The email is not valid"),

        password: z
          .string()
          .min(5, "Password should contain at least 5 characters"),

        firstname: z.string().nonempty("Organization name should be filled"),

        lastname: z.string().nonempty("Organization name should be filled"),
      });

      const userValidation = userValidator.safeParse(body);

      if (!userValidation.success) {
        return res.status(400).json({
          success: false,
          message: generateErrorMessage(userValidation.error.issues, {
            maxErrors: 1,
            path: { enabled: false },
            code: { enabled: false },
            message: { enabled: true, label: "" },
          }),
        });
      }

      break;

    case "ORGANIZATION":
      const organizationValidator = z.object({
        email: z
          .string()
          .nonempty("Email should be filled")
          .email("The email is not valid"),

        password: z
          .string()
          .min(5, "Password should contain at least 5 characters"),

        orgname: z.string().nonempty("Organization name should be filled"),
      });

      const organizationValidation = organizationValidator.safeParse(body);

      if (!organizationValidation.success) {
        return res.status(400).json({
          success: false,
          message: generateErrorMessage(organizationValidation.error.issues, {
            maxErrors: 1,
            path: { enabled: false },
            code: { enabled: false },
            message: { enabled: true, label: "" },
          }),
        });
      }

      break;

    default:
      return res.status(400).json({
        success: false,
        message: `You tried to register with the wrong role. The role ${body.role} is not available.`,
      });
  }

  const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS!));
  const passwordHash = await bcrypt.hash(body.password, salt);

  try {
    await prisma.user.create({
      data: {
        email: body.email,
        password: passwordHash,
        role: body.role,
        firstname: body.firstname,
        lastname: body.lastname,
        orgname: body.orgname,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "Registration failed" });
  }

  res
    .status(200)
    .json({ success: true, message: "You have successfully registered" });
}
