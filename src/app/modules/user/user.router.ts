import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.get("/", UserController.getAllFromDB);

export const UserRouter = router;
