"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prismaProvider_1 = __importDefault(require("../../../utils/prismaProvider"));
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prismaProvider_1.default.category.findFirst({
        where: {
            title: data.title,
        },
    });
    if (isUserExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Category already exist");
    }
    const result = yield prismaProvider_1.default.category.create({
        data,
    });
    return result;
});
const getAllFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaProvider_1.default.category.findMany();
    return result;
});
const getSingleCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prismaProvider_1.default.category.findFirst({
        where: {
            id,
        },
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Category ID not exist");
    }
    const result = yield prismaProvider_1.default.category.findUnique({
        where: {
            id,
        },
        include: {
            books: true,
        },
    });
    return result;
});
const updateSingleCategory = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaProvider_1.default.category.update({
        where: {
            id,
        },
        data: payload,
        include: {
            books: true,
        },
    });
    return result;
});
const deleteSingleCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaProvider_1.default.category.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.CategoriesService = {
    insertIntoDB,
    getAllFromDB,
    getSingleCategory,
    updateSingleCategory,
    deleteSingleCategory,
};
