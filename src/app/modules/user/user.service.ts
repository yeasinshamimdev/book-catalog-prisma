import { User } from "@prisma/client";
import prisma from "../../../utils/prismaProvider";

type UserWithoutPassword = Omit<User, "password">;

const getAllFromDB = async (): Promise<UserWithoutPassword[]> => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};

const getSingleUser = async (
  id: string
): Promise<UserWithoutPassword | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      orders: true,
      reviewAndRatings: true,
    },
  });
  //@ts-ignore
  const { password, ...data } = result;
  return data;
};

const updateSingleUser = async (
  id: string,
  payload: Partial<User>
): Promise<UserWithoutPassword> => {
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
  const { password, ...data } = result;
  return data;
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
