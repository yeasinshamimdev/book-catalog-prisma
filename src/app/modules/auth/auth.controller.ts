import { Request, Response } from "express";
import httpStatus from "http-status";
import config from "../../../config";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { AuthService } from "./auth.service";

const create = catchAsync(async (req: Request, res: Response) => {
  // const result = await AuthService.create(req.body);

  const { ...loginData } = req.body;
  const result = await AuthService.create(loginData);
  const { refreshToken, ...others } = result;

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created successful",
    data: others,
  });
});

export const AuthController = {
  create,
};
