import { User, UserModel } from "../model/user.model";
import { Model, Types } from "mongoose";
import bcrypt from "bcryptjs";

export class UserRepository {
  constructor(private readonly userModel: Model<User>) {}

  async getAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async findOne(email: string) {
    const dude = await this.userModel.findOne({ email });
    return dude;
  }

  async getById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (user === null) {
      return {} as User;
    }
    return user;
  }

  async create(user: User): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hashSync(user.password, salt);
    const userHashed = new UserModel({
      name: user.name,
      email: user.email,
      password: hash,
      age: user.age,
      cpf: user.cpf,
    });
    return this.userModel.create(userHashed);
  }

  async update(id: string, user: User): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
    });
    if (updatedUser === null) {
      return {} as User;
    }
    return updatedUser;
  }

  async delete(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    if (deletedUser === null) {
      return {} as User;
    }
    return deletedUser;
  }
}

export const repo = new UserRepository(UserModel);
