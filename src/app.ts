import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { authMiddleware } from "./users/middlewares/authMiddleware";
// import authRoutes from "./auth/routes/authRoutes";
import { mongoConnect } from "../db/mongo.connection";
import userRoutes from "./users/routes/userRoutes";
import { authRoutes } from "./users/routes/authRoutes";

dotenv.config();

mongoConnect();

const app: Application = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use(authRoutes);
app.use("/users", userRoutes);
app.use(authMiddleware);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

export default app;
