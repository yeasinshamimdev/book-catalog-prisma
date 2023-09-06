"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRouters = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const book_controller_1 = require("./book.controller");
const router = express_1.default.Router();
router.post("/create-book", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), book_controller_1.BooksController.insertIntoDB);
router.patch("/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), book_controller_1.BooksController.updateSingleBook);
router.delete("/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), book_controller_1.BooksController.deleteSingleBook);
// router.get("/:id", BooksController.getCategoryById);
router.get("/:id", book_controller_1.BooksController.getSingleBook);
router.get("/", book_controller_1.BooksController.getAllFromDB);
exports.BookRouters = router;
