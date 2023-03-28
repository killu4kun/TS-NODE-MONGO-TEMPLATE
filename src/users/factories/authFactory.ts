import { AuthController } from "../controllers/authController";
import { UserService } from "../services/UserService";
import { UserRepository } from "../repositories/user.repository";
import { UserModel } from "../model/user.model";

export function authControllerFactory() {
  const userRepository = new UserRepository(UserModel);
  const userService = new UserService(userRepository);
  const authController = new AuthController(userService);
  return authController;
}

export const auth = authControllerFactory();
