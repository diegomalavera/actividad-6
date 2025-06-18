import { User } from "../model/user.model";
import axios, { AxiosInstance } from "axios";

export class UserService {
    axios: AxiosInstance;

    constructor() {
        this.axios = axios.create({
            baseURL: "http://application-api:3000/api/v1",
            timeout: 5000,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    async getUsers(): Promise<User[]> {
        const response = await this.axios.get<User[]>("/users");
        return response.data;
    }

    async getUser(id: string): Promise<User> {
        const response = await this.axios.get<User>("/users/" + id);
        return response.data;
    }

    async createUser(user: User): Promise<User> {
        const response = await this.axios.post<User>("/users", user);
        return response.data;
    }

    async updateUser(id: string, user: User): Promise<User> {
        const response = await this.axios.put<User>("/users/" + id, user);
        return response.data;
    }

    async deleteUser(id: string): Promise<any> {
        const response = await this.axios.delete<void>("/users/" + id);
        return response;
    }
}
