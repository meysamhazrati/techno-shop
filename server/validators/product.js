import { object, string, number, array } from "yup";

const create = object({
  title: string().required().min(5).max(100),
  price: number().required().min(1000).max(1000000000),
  inventory: number().required().min(0).max(1000000),
  warranty: number().required().min(0).max(100),
  colors: array().of(string()).required().min(1).max(10),
  covers: object({
    mimetype: string().oneOf(["image/png", "image/jpg", "image/jpeg"]),
    size: number().max(20 * 1024 * 1024),
  }),
  brand: string().required().matches(/^[0-9a-fA-F]{24}$/),
  category: string().required().matches(/^[0-9a-fA-F]{24}$/),
});

const update = object({
  title: string().required().min(5).max(100),
  price: number().required().min(1000).max(1000000000),
  inventory: number().required().min(0).max(1000000),
  warranty: number().required().min(0).max(100),
  colors: array().of(string()).required().min(1).max(10),
});

export { create, update };