import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserController } from "./user.controller";
import { userValidation } from "./user.validation";

const router = Router();

router.post(
  "/create",
  validateRequest(userValidation.userValidationSchema),
  UserController.createUser,
);

router.post("/login", UserController.login);

export const UserRoutes = router;
