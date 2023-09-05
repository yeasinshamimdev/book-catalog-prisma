import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { CategoriesService } from "./category.service";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoriesService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category created successful",
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoriesService.getAllFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All categories retrieved successful",
    data: result,
  });
});

const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoriesService.getSingleCategory(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single category retrieved successful",
    data: result,
  });
});

const updateSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoriesService.updateSingleCategory(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Updated successful",
    data: result,
  });
});

const deleteSingleCategory = catchAsync(async (req: Request, res: Response) => {
  await CategoriesService.deleteSingleCategory(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Deleted successful",
  });
});

export const CategoriesController = {
  insertIntoDB,
  getAllFromDB,
  getSingleCategory,
  updateSingleCategory,
  deleteSingleCategory,
};
