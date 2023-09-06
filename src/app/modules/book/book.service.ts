import { Book } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../utils/prismaProvider";

const insertIntoDB = async (data: Book): Promise<Book> => {
  const isBookExist = await prisma.book.findFirst({
    where: {
      title: data.title,
      author: data.author,
    },
  });
  if (isBookExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "book already exits");
  }
  const result = await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });
  return result;
};

const getAllFromDB = async (): Promise<Book[]> => {
  const result = await prisma.book.findMany({
    include: {
      category: true,
    },
  });
  return result;
};

const getSingleBook = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });
  return result;
};

const updateSingleBook = async (
  id: string,
  payload: Partial<Book>
): Promise<Book> => {
  const result = await prisma.book.update({
    where: {
      id,
    },
    data: payload,
    include: {
      category: true,
    },
  });
  return result;
};

const deleteSingleBook = async (id: string) => {
  const result = await prisma.book.delete({
    where: {
      id,
    },
  });
  return result;
};

export const BookService = {
  insertIntoDB,
  getAllFromDB,
  getSingleBook,
  updateSingleBook,
  deleteSingleBook,
};
