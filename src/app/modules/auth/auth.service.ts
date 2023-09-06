import { User } from "@prisma/client";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import prisma from "../../../utils/prismaProvider";
import { ILoginUserResponse } from "./auth.interface";

const create = async (data: User): Promise<ILoginUserResponse> => {
  const { email, password, role } = data;
  const isUserExist = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User already exits");
  }

  let accessToken = null;
  let refreshToken = null;
  let result;

  if (!isUserExist) {
    result = await prisma.user.create({
      data,
      include: {
        orders: true,
        reviewAndRatings: true,
      },
    });

    accessToken = jwtHelpers.createToken(
      { email, password, role },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );

    refreshToken = jwtHelpers.createToken(
      { email, password, role },
      config.jwt.refresh_secret as Secret,
      config.jwt.refresh_expires_in as string
    );
  }

  return {
    accessToken,
    refreshToken,
    ...result,
  };
};

export const AuthService = {
  create,
};
