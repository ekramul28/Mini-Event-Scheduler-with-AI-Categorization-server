import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserRole, CustomJwtPayload } from "../modules/auth/auth.types";

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      res.status(401).json({ error: "Access token is required" });
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    ) as CustomJwtPayload;

    // Add user info to request object
    req.user = {
      email: decoded.email || "",
      role: decoded.role,
      iat: decoded.iat,
      exp: decoded.exp,
    };

    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid or expired token" });
  }
};

// Middleware to check if user is admin
export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.user?.role !== UserRole.ADMIN) {
    res.status(403).json({ error: "Forbidden: Admin access required" });
    return;
  }
  next();
};

// Middleware to check if user is teacher
export const isTeacher = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.user?.role !== UserRole.TEACHER) {
    res.status(403).json({ error: "Forbidden: Teacher access required" });
    return;
  }
  next();
};

// Middleware to check if user is super admin
export const isSuperAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.user?.role !== UserRole.SUPER_ADMIN) {
    res.status(403).json({ error: "Forbidden: Super Admin access required" });
    return;
  }
  next();
};

// Middleware to check if user is admin or teacher
export const isAdminOrTeacher = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (
    req.user?.role !== UserRole.ADMIN &&
    req.user?.role !== UserRole.TEACHER
  ) {
    res.status(403).json({ error: "Forbidden: Insufficient permissions" });
    return;
  }
  next();
};
