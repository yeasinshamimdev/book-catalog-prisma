import { User } from "@prisma/client";
import prisma from "../../../utils/prismaProvider";

const create = async (data: User): Promise<User> => {
  const result = await prisma.user.create({
    data,
    include: {
      orders: true,
      reviewAndRatings: true,
    },
  });
  return result;
};

export const AuthService = {
  create,
};
