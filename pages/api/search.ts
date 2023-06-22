import { Animal, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ animals: Animal[] }>
) {
  const prisma = new PrismaClient();
  const query = req.query.q as string;

  let animals: Animal[] = [];

  if (query) {
    animals = await prisma.animal.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
    });
  }

  res.status(200).json({ animals });
}
