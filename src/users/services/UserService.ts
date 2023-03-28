import bcrypt from "bcryptjs";
import { CustomErrors } from "../../utils/error.handler";
import { UserRepository } from "../repositories/user.repository";
import { Types } from "mongoose";
import { invalidIdError, promiseError } from "../../utils/error.handler";
import { response } from "express";
import { User } from "../model/user.model";
import { UserDto } from "../dtos/user.dto";

export interface UserServiceT {
  comparePassword(password: string, hash: string): Promise<boolean>;
}

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(user: User): Promise<User | CustomErrors> {
    try {
      const response = await this.userRepository.create(user);
      return response;
    } catch (error) {
      return promiseError(error);
    }
  }

  async getUserByEmailAndPassword(
    email: string,
    password: string
  ): Promise<User | null> {
    const user = await this.userRepository.findOne(email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await this.comparePassword(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }
  async comparePassword(password: string, hash: string): Promise<boolean> {
    console.log("password", password, "hash", hash);
    return bcrypt.compare(password, hash);
  }

  async getAll(): Promise<User[] | CustomErrors> {
    try {
      const users = await this.userRepository.getAll();

      return users;
    } catch (error) {
      return promiseError(error);
    }
  }

  async getById(id: string): Promise<User | CustomErrors> {
    try {
      if (Types.ObjectId.isValid(id)) {
        const user = await this.userRepository.getById(id);
        return user;
      }
      return invalidIdError(id);
    } catch (error) {
      return promiseError(error);
    }
  }

  async update(id: string, user: User): Promise<User | CustomErrors> {
    try {
      if (Types.ObjectId.isValid(id)) {
        const updatedUser = await this.userRepository.update(id, user);
        return updatedUser;
      }
      return invalidIdError(id);
    } catch (error) {
      return promiseError(error);
    }
  }

  async delete(id: string): Promise<User | CustomErrors> {
    try {
      if (Types.ObjectId.isValid(id)) {
        const deletedUser = await this.userRepository.delete(id);
        return deletedUser;
      }
      return invalidIdError(id);
    } catch (error) {
      return promiseError(error);
    }
  }
}
