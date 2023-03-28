import { UserDto } from "./../dtos/user.dto";
import { StatusCode } from "../../utils/status.code";
import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { invalidBody } from "../utils/user.body.validator";
import { invalidBodyError } from "../../utils/error.handler";

export class UserController {
  constructor(private readonly userService: UserService) {}

  async getAll(req: Request, res: Response) {
    const response = await this.userService.getAll();

    if ("promiseError" in response) {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json(response);
      return;
    }

    res.status(StatusCode.OK).json(response);
  }

  async getById(req: Request, res: Response) {
    const response = await this.userService.getById(req.params.id);

    if ("promiseError" in response) {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json(response);
      return;
    }

    if ("invalidIdError" in response) {
      res.status(StatusCode.BAD_REQUEST).json(response);
      return;
    }

    res.status(StatusCode.OK).json(response);
  }

  async create(req: Request, res: Response) {
    if (!invalidBody(req)) {
      res.status(StatusCode.BAD_REQUEST).json(invalidBodyError(req.body));
      return;
    }

    const body = req.body;
    const userDto = new UserDto(body);

    const response = await this.userService.create(userDto);
    if ("promiseError" in response) {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json(response);
      return;
    }

    res.status(StatusCode.CREATED).json(response);
  }

  async update(req: Request, res: Response) {
    if (invalidBody(req)) {
      res.status(StatusCode.BAD_REQUEST).json(invalidBodyError(req.body));
      return;
    }

    const body = req.body;
    const id = req.params.id;
    const userDto = new UserDto(body);

    const response = await this.userService.update(id, userDto);

    if ("promiseError" in response) {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json(response);
      return;
    }

    if ("invalidIdError" in response) {
      res.status(StatusCode.BAD_REQUEST).json(response);
      return;
    }

    res.status(StatusCode.OK).json(response);
  }

  async delete(req: Request, res: Response) {
    const response = await this.userService.delete(req.params.id);

    if ("promiseError" in response) {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json(response);
      return;
    }

    if ("invalidIdError" in response) {
      res.status(StatusCode.BAD_REQUEST).json(response);
      return;
    }

    res.status(StatusCode.OK).json(response);
  }
}
