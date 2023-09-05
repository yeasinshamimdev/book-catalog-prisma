import { User } from "@prisma/client";
import prisma from "../../../utils/prismaProvider";

const getAllFromDB = async (): Promise<User[]> => {
  const result = await prisma.user.findMany();
  return result;
};

const getSingleUser = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      orders: true,
      reviewAndRatings: true,
    },
  });
  return result;
};

const updateSingleUser = async (
  id: string,
  payload: Partial<User>
): Promise<Partial<User>> => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
    include: {
      orders: true,
      reviewAndRatings: true,
    },
  });
  return result;
};

const deleteSingleUser = async (id: string) => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
};

export const UserService = {
  getAllFromDB,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
};
