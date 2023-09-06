import express from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.get("/:id", auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleUser);

router.patch(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(UserValidation.update),
  UserController.updateSingleUser
);

router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.deleteSingleUser
);
// get all users
router.get("/", auth(ENUM_USER_ROLE.ADMIN), UserController.getAllFromDB);

export const UserRouter = router;
