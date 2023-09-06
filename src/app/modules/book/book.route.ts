import express from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import { BooksController } from "./book.controller";

const router = express.Router();

router.post(
  "/create-book",
  auth(ENUM_USER_ROLE.ADMIN),
  BooksController.insertIntoDB
);

router.patch(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  BooksController.updateSingleBook
);

router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  BooksController.deleteSingleBook
);

// router.get("/:id", BooksController.getCategoryById);

router.get("/:id", BooksController.getSingleBook);
router.get("/", BooksController.getAllFromDB);

export const BookRouters = router;
