import { Category } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../utils/prismaProvider";

const insertIntoDB = async (data: Category): Promise<Category> => {
  const isUserExist = await prisma.category.findFirst({
    where: {
      title: data.title,
    },
  });
  if (isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Category already exist");
  }
  const result = await prisma.category.create({
    data,
  });
  return result;
};

const getAllFromDB = async (): Promise<Category[]> => {
  const result = await prisma.category.findMany();
  return result;
};

const getSingleCategory = async (id: string): Promise<Category | null> => {
  const isUserExist = await prisma.category.findFirst({
    where: {
      id,
    },
  });
  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Category ID not exist");
  }

  const result = await prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      books: true,
    },
  });
  return result;
};

const updateSingleCategory = async (
  id: string,
  payload: Partial<Category>
): Promise<Category> => {
  const result = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
    include: {
      books: true,
    },
  });
  return result;
};

const deleteSingleCategory = async (id: string) => {
  const result = await prisma.category.delete({
    where: {
      id,
    },
  });
  return result;
};

export const CategoriesService = {
  insertIntoDB,
  getAllFromDB,
  getSingleCategory,
  updateSingleCategory,
  deleteSingleCategory,
};
