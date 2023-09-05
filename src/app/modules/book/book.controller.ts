import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { BookService } from "./book.service";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book created successful",
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getAllFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All books retrieved successful",
    data: result,
  });
});

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getSingleBook(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single book retrieved successful",
    data: result,
  });
});

const updateSingleBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.updateSingleBook(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Updated successful",
    data: result,
  });
});

const deleteSingleBook = catchAsync(async (req: Request, res: Response) => {
  await BookService.deleteSingleBook(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Deleted successful",
  });
});

export const BooksController = {
  insertIntoDB,
  getAllFromDB,
  getSingleBook,
  updateSingleBook,
  deleteSingleBook,
};
