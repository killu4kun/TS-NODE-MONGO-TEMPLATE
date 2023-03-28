import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import doetenv from "dotenv";

doetenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET) as any;
    req.body.email = decodedToken.email;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
