import { User } from "../model/user.model";
import { z as Validator, ZodError } from "zod/v4";

export class UserUtil {
    formDatatoUser(formData: FormData): User {
        return {
            name: this.mapFieldToString(formData.get("name")),
            lastName: this.mapFieldToString(formData.get("lastName")),
            email: this.mapFieldToString(formData.get("email")),
            phoneNumber: this.mapFieldToString(formData.get("phoneNumber")),
            country: this.mapFieldToString(formData.get("country")),
            city: this.mapFieldToString(formData.get("city")),
            address: this.mapFieldToString(formData.get("address")),
        } as User;
    }

    mapFieldToString(value: FormDataEntryValue | null): string {
        return typeof value === "string" ? value : "";
    }

    validate(user: User): void {
        try {
            const userValidation = Validator.object({
                name: Validator.string().nonempty(),
                lastName: Validator.string().nonempty(),
                email: Validator.email().nonempty(),
                phoneNumber: Validator.string().nonempty(),
                country: Validator.string().nonempty(),
                city: Validator.string().nonempty(),
                address: Validator.string().nonempty(),
            });

            userValidation.parse(user);
        } catch (error: any) {
            if (error instanceof ZodError) {
                throw Error("Los campos son requeridos");
            }
        }
    }
}
