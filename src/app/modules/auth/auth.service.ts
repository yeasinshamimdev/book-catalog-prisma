import { User } from "@prisma/client";
import prisma from "../../../utils/prismaProvider";

const create = async (data: User): Promise<User> => {
  const result = await prisma.user.create({
    data,
  });
  return result;
};

export const AuthService = {
  create,
};
