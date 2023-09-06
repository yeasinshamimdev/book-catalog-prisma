import { Order, Prisma } from "@prisma/client";
import prisma from "../../../utils/prismaProvider";

const insertIntoDB = async (
  data:
    | (Prisma.Without<
        Prisma.OrderCreateInput,
        Prisma.OrderUncheckedCreateInput
      > &
        Prisma.OrderUncheckedCreateInput)
    | (Prisma.Without<
        Prisma.OrderUncheckedCreateInput,
        Prisma.OrderCreateInput
      > &
        Prisma.OrderCreateInput)
): Promise<Order> => {
  const result = await prisma.order.create({
    data,
  });
  return result;
};

const getAllFromDB = async (): Promise<Order[]> => {
  const result = await prisma.order.findMany({});
  return result;
};

const getSingleOrder = async (id: string): Promise<Order | null> => {
  const result = await prisma.order.findUnique({
    where: {
      id,
    },
  });
  return result;
};

export const OrderService = {
  insertIntoDB,
  getAllFromDB,
  getSingleOrder,
};
