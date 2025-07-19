import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload & { role: UserRole; email: string };
    }
  }
}
