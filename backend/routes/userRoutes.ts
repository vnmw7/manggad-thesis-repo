import { Router } from "express";
import { userController } from "../controllers/userController";

const router = Router();

// "/user"
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.addUser);
router.post("/login", userController.loginUser);

export default router;
