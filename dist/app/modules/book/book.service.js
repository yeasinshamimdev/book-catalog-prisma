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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prismaProvider_1 = __importDefault(require("../../../utils/prismaProvider"));
const book_constants_1 = require("./book.constants");
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isBookExist = yield prismaProvider_1.default.book.findFirst({
        where: {
            title: data.title,
            author: data.author,
        },
    });
    if (isBookExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "book already exits");
    }
    const result = yield prismaProvider_1.default.book.create({
        data,
        include: {
            category: true,
        },
    });
    return result;
});
const getAllFromDB = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { search, minPrice, maxPrice, categoryId } = filters, filterData = __rest(filters, ["search", "minPrice", "maxPrice", "categoryId"]);
    const andConditions = [];
    if (minPrice) {
        andConditions.push({
            price: {
                gte: parseFloat(minPrice),
            },
        });
    }
    if (maxPrice) {
        andConditions.push({
            price: {
                lte: parseFloat(maxPrice),
            },
        });
    }
    if (categoryId) {
        andConditions.push({
            categoryId: categoryId,
        });
    }
    if (search) {
        andConditions.push({
            OR: book_constants_1.bookSearchableFields.map((field) => ({
                [field]: {
                    contains: search,
                    mode: "insensitive",
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map((key) => {
                if (book_constants_1.bookRelationalFields.includes(key)) {
                    return {
                        [book_constants_1.bookRelationalFieldsMapper[key]]: {
                            id: filterData[key],
                        },
                    };
                }
                else {
                    return {
                        [key]: {
                            equals: filterData[key],
                        },
                    };
                }
            }),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prismaProvider_1.default.book.findMany({
        include: {
            category: true,
        },
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                createdAt: "desc",
            },
    });
    const total = yield prismaProvider_1.default.book.count({
        where: whereConditions,
    });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
// const getCategoryById = async (
//   categoryId: string,
//   filters: IBookFilterRequest,
//   options: IPaginationOptions
// ): Promise<Book> => {
//   const { limit, page, skip } = paginationHelpers.calculatePagination(options);
//   const { search, minPrice, maxPrice, ...filterData } = filters;
//   const andConditions = [];
//   if (search) {
//     andConditions.push({
//       OR: bookSearchableFields.map((field) => ({
//         [field]: {
//           contains: search,
//           mode: "insensitive",
//         },
//       })),
//     });
//   }
//   if (Object.keys(filterData).length > 0) {
//     andConditions.push({
//       AND: Object.keys(filterData).map((key) => {
//         if (bookRelationalFields.includes(key)) {
//           return {
//             [bookRelationalFieldsMapper[key]]: {
//               id: (filterData as any)[key],
//             },
//           };
//         } else {
//           return {
//             [key]: {
//               equals: (filterData as any)[key],
//             },
//           };
//         }
//       }),
//     });
//   }
//   const whereConditions: Prisma.BookWhereInput =
//     andConditions.length > 0 ? { AND: andConditions } : {};
//   const result = await prisma.book.findMany({
//     include: {
//       category: true,
//     },
//     where: whereConditions,
//     skip,
//     take: limit,
//     orderBy:
//       options.sortBy && options.sortOrder
//         ? { [options.sortBy]: options.sortOrder }
//         : {
//             createdAt: "desc",
//           },
//   });
//   const total = await prisma.book.count({
//     where: whereConditions,
//   });
//   return {
//     meta: {
//       total,
//       page,
//       limit,
//     },
//     data: result,
//   };
// };
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaProvider_1.default.book.findUnique({
        where: {
            id,
        },
        include: {
            category: true,
        },
    });
    return result;
});
const updateSingleBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaProvider_1.default.book.update({
        where: {
            id,
        },
        data: payload,
        include: {
            category: true,
        },
    });
    return result;
});
const deleteSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaProvider_1.default.book.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.BookService = {
    insertIntoDB,
    getAllFromDB,
    // getCategoryById,
    getSingleBook,
    updateSingleBook,
    deleteSingleBook,
};
