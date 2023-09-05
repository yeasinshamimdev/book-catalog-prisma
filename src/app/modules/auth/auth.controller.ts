import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { AuthService } from "./auth.service";

const create = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.create(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created successful",
    data: result,
  });
});

export const AuthController = {
  create,
};
