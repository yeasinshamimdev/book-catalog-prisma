import { z } from "zod";

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
    author: z.string({
      required_error: "author is required",
    }),
    genre: z.string({
      required_error: "genre is required",
    }),
    price: z.string({
      required_error: "price is required",
    }),
    publicationDate: z.string({
      required_error: "publication date is required",
    }),
    categoryId: z.string({
      required_error: "categoryId is required",
    }),
  }),
});

const update = z.object({
  body: z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    genre: z.string().optional(),
    price: z.string().optional(),
    publicationDate: z.string().optional(),
    categoryId: z.string().optional(),
  }),
});

export const BookValidation = {
  create,
  update,
};
