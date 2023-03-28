import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserService } from "../services/UserService";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "";

export class AuthController {
  constructor(private userService: UserService) {
    this.userService = userService;
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await this.userService.getUserByEmailAndPassword(
      email,
      password
    );
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "24h" });
    return res.status(200).json({ token });
  }
}
