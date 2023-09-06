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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prismaProvider_1 = __importDefault(require("../../../utils/prismaProvider"));
const create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, role } = data;
    const isUserExist = yield prismaProvider_1.default.user.findFirst({
        where: {
            email,
        },
    });
    if (isUserExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "User already exits");
    }
    let accessToken = null;
    let refreshToken = null;
    let result;
    if (!isUserExist) {
        result = yield prismaProvider_1.default.user.create({
            data,
            include: {
                orders: true,
                reviewAndRatings: true,
            },
        });
        accessToken = jwtHelpers_1.jwtHelpers.createToken({ email, password, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
        refreshToken = jwtHelpers_1.jwtHelpers.createToken({ email, password, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    }
    return Object.assign({ accessToken,
        refreshToken }, result);
});
exports.AuthService = {
    create,
};
