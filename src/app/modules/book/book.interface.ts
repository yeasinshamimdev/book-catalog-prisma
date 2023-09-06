export type IBookFilterRequest = {
  search?: string | undefined;
  title?: string | undefined;
  author?: string | undefined;
  genre?: string | undefined;
  minPrice?: string | undefined;
  maxPrice?: string | undefined;
  categoryId?: string | undefined;
};
