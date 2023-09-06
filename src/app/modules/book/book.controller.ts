import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import pick from "../../../utils/pick";
import sendResponse from "../../../utils/sendResponse";
import { bookFilterableFields } from "./book.constants";
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
  const filters = pick(req.query, bookFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await BookService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All books retrieved successful",
    meta: result.meta,
    data: result.data,
  });
});

// const getCategoryById = catchAsync(async (req: Request, res: Response) => {
//   const filters = pick(req.query, bookFilterableFields);
//   const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
//   const categoryId = req.params.id;
//   const result = await BookService.getCategoryById(
//     categoryId,
//     filters,
//     options
//   );
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "category retrieved successful",
//     meta: result.meta,
//     data: result.data,
//   });
// });

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
  const result = await BookService.deleteSingleBook(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Deleted successful",
    data: result,
  });
});

export const BooksController = {
  insertIntoDB,
  getAllFromDB,
  // getCategoryById,
  getSingleBook,
  updateSingleBook,
  deleteSingleBook,
};
