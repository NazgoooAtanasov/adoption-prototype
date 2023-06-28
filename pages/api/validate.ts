import { NextApiRequest, NextApiResponse } from "next";
import { validateToken } from "../../utils/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ showOrgMenu: boolean }>
) {
  let showOrgMenu = false;
  let token = req.cookies.jwt_token;
  const { valid, payload } = validateToken(token);

  if (valid && payload?.role === "ORGANIZATION") {
    showOrgMenu = true;
  }

  res.status(200).json({ showOrgMenu: showOrgMenu });
}
