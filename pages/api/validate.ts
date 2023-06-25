import { NextApiRequest, NextApiResponse } from "next";
import * as jwt from "jsonwebtoken";
import { Role } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ showOrgMenu: boolean }>
) {
  let showOrgMenu = false;

  let decodedToken: { email: string; role: Role } | null = null;
  try {
    decodedToken = jwt.verify(
      req.body.token,
      process.env.JWT_SECRET!
    ) as jwt.JwtPayload & {
      email: string;
      role: Role;
    };
  } catch (error) {}

  if (decodedToken?.role === "ORGANIZATION") {
    showOrgMenu = true;
  }

  res.status(200).json({ showOrgMenu: showOrgMenu });
}
