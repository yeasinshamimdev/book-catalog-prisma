"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
        }),
        password: zod_1.z.string({
            required_error: "Password is required",
        }),
        email: zod_1.z.string({
            required_error: "Email is required",
        }),
        role: zod_1.z.enum([...Object.values(client_1.Role)], {
            required_error: "Role is required",
        }),
        contactNo: zod_1.z.string({
            required_error: "ContactNo is required",
        }),
        address: zod_1.z.string({
            required_error: "address is required",
        }),
        profileImg: zod_1.z.string({
            required_error: "profileImg is required",
        }),
    }),
});
exports.AuthValidation = {
    create,
};
