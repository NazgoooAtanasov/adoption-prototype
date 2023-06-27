import multer from "multer";
import { PrismaClient } from "@prisma/client";
import { CloudflareStorage } from "multer-cloudflare-storage";
import { NextApiRequest, NextApiResponse } from "next";
import { validateToken } from "../../../utils/auth";

async function simulateMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: (...args: any[]) => void
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
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

  const animalId = req.query.animalid;
  if (!animalId) {
    return res
      .status(400)
      .json({ success: false, message: "Animal ID required." });
  }

  const upload = multer({
    storage: new CloudflareStorage(
      process.env.CF_ACCOUNT_ID!,
      process.env.CF_ACCOUNT_TOKEN!
    ),
  });

  try {
    await simulateMiddleware(req, res, upload.single("image"));
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Error in uploading image." });
  }

  // @ts-ignore
  const file = req.file;

  if (!file) {
    return res
      .status(400)
      .json({ success: false, message: "Error in uploading image." });
  }

  const CF_image_id = file.destination;
  try {
    const prisma = new PrismaClient();
    await prisma.animal.update({
      where: {
        id: animalId as string,
      },
      data: {
        images: [CF_image_id],
      },
    });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Error in uploading image." });
  }

  res.status(201).json({
    success: true,
    message: "Image update succesfully. Check the animal page at",
  });
}
export const config = {
  api: {
    bodyParser: false,
  },
};
