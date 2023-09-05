import { Role } from "@prisma/client";
import { z } from "zod";

const create = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    password: z.string({
      required_error: "Password is required",
    }),
    email: z.string({
      required_error: "Email is required",
    }),
    role: z.enum([...Object.values(Role)] as [string, ...string[]], {
      required_error: "Role is required",
    }),
    contactNo: z.string({
      required_error: "ContactNo is required",
    }),
    address: z.string({
      required_error: "address is required",
    }),
    profileImg: z.string({
      required_error: "profileImg is required",
    }),
  }),
});

export const AuthValidation = {
  create,
};
