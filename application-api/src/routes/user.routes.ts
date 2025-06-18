import { Router } from "express";
import { UserRestController } from "../controller/user.rest.controller";

const userRestController: UserRestController = new UserRestController();

const userRoutes = Router();

userRoutes.get("/", userRestController.getUsers);
userRoutes.get("/:id", userRestController.getUser);
userRoutes.post("/", userRestController.createUser);
userRoutes.put("/:id", userRestController.updateUser);
userRoutes.delete("/:id", userRestController.deleteUser);

export default userRoutes;
