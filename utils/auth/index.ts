import type { Role } from "@prisma/client";
import * as jwt from "jsonwebtoken";

export function validateToken(token: string | undefined | null): {
  valid: boolean;
  payload: (jwt.JwtPayload & { email: string; role: Role }) | null;
} {
  if (!token) {
    return { valid: false, payload: null };
  }

  let payload: (jwt.JwtPayload & { email: string; role: Role }) | null = null;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload & {
      email: string;
      role: Role;
    };
  } catch (err) {
    return { valid: false, payload: null };
  }

  return { valid: true, payload: payload };
}
