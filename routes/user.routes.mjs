import { Router } from "express";
import * as userController from "../controller/user.controller.mjs";

const router = Router();

router.post("/", userController.createUserController); // signup + login
router.post("/login", userController.loginUserController);

router.get("/", userController.getAllUsersController);
router.get("/email/:email", userController.getUserByEmailController);
router.get("/:id", userController.getUserByIdController);

router.patch("/:id", userController.updateUserController);
router.delete("/:id", userController.deleteUserController);

export default router;