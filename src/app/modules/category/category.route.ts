import express from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { CategoriesController } from "./category.controller";
import { CategoryValidation } from "./category.validation";

const router = express.Router();

router.post(
  "/create-category",
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(CategoryValidation.create),
  CategoriesController.insertIntoDB
);

router.patch(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(CategoryValidation.update),
  CategoriesController.updateSingleCategory
);

router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  CategoriesController.deleteSingleCategory
);

router.get("/:id", CategoriesController.getSingleCategory);
router.get("/", CategoriesController.getAllFromDB);

export const CategoryRouters = router;
