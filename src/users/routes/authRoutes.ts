import express from "express";
import { auth } from "../factories/authFactory";

const authRoutes = express.Router();

authRoutes.post("/login", auth.login.bind(auth));

export { authRoutes };
