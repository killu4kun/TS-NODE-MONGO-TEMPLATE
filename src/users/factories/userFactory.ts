import { UserService } from "../services/UserService";
import { UserRepository } from "./../repositories/user.repository";
import { UserModel } from "../model/user.model";
import { UserController } from "../controllers/userController";

export function userFactory() {
  const userRepository = new UserRepository(UserModel);
  const userService = new UserService(userRepository);
  const userController = new UserController(userService);
  return userController;
}

export const user = userFactory();
