import { User } from "@prisma/client";
import prisma from "../../../utils/prismaProvider";

const getAllFromDB = async (): Promise<User[]> => {
  const result = await prisma.user.findMany();
  return result;
};

export const UserService = {
  getAllFromDB,
};
