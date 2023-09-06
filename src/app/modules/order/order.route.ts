import express from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import { OrdersController } from "./order.controller";

const router = express.Router();

router.post(
  "/create-order",
  auth(ENUM_USER_ROLE.CUSTOMER),
  OrdersController.insertIntoDB
);

router.get("/:id", OrdersController.getSingleOrder);
router.get("/", auth(ENUM_USER_ROLE.ADMIN), OrdersController.getAllFromDB);

export const OrderRouters = router;
