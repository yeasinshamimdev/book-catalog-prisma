import express from "express";
import { AuthRouter } from "../modules/auth/auth.route";
import { BookRouters } from "../modules/book/book.route";
import { CategoryRouters } from "../modules/category/category.route";
import { OrderRouters } from "../modules/order/order.route";
import { UserRouter } from "../modules/user/user.router";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRouter,
  },
  {
    path: "/users",
    route: UserRouter,
  },
  {
    path: "/categories",
    route: CategoryRouters,
  },
  {
    path: "/books",
    route: BookRouters,
  },
  {
    path: "/orders",
    route: OrderRouters,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
