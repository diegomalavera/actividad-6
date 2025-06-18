import { Request, Response } from "express";
import { UserService } from "../service/user.service";

export class UserRestController {
    userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    getUsers = async (request: Request, response: Response): Promise<void> => {
        response.json(await this.userService.getUsers());
    };

    getUser = async (request: Request, response: Response): Promise<void> => {
        const { id } = request.params;
        response.json(await this.userService.getUser(id));
    };

    createUser = async (
        request: Request,
        response: Response
    ): Promise<void> => {
        response.json(await this.userService.createUser(request.body));
    };

    updateUser = async (
        request: Request,
        response: Response
    ): Promise<void> => {
        const { id } = request.params;
        response.json(await this.userService.updateUser(id, request.body));
    };

    deleteUser = async (
        request: Request,
        response: Response
    ): Promise<void> => {
        const { id } = request.params;
        response.json(await this.userService.deleteUser(id));
    };
}
