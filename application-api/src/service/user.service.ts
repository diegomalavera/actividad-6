import {
    DeleteCommand,
    GetCommand,
    PutCommand,
    ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDb } from "../config/dynamo";
import { User } from "../model/user.model";
import { v4 as uuid } from "uuid";

export class UserService {
    tableName: string = "users";

    async getUsers(): Promise<User[]> {
        const result = await DynamoDb.send(
            new ScanCommand({ TableName: this.tableName })
        );
        return result.Items as User[];
    }

    async getUser(id: string): Promise<User> {
        const result = await DynamoDb.send(
            new GetCommand({
                TableName: this.tableName,
                Key: { id },
            })
        );

        return result.Item as User;
    }

    async createUser(user: User): Promise<User> {
        user.id = uuid();
        await DynamoDb.send(
            new PutCommand({ TableName: this.tableName, Item: user })
        );
        return user;
    }

    async updateUser(id: string, user: User): Promise<User> {
        user.id = id;
        await DynamoDb.send(
            new PutCommand({ TableName: this.tableName, Item: user })
        );
        return user;
    }

    async deleteUser(id: string): Promise<boolean> {
        await DynamoDb.send(
            new DeleteCommand({
                TableName: this.tableName,
                Key: { id },
            })
        );

        return true;
    }
}
