import { object, string, number, array } from "yup";

const create = object({
  title: string().required().min(5).max(100),
  price: number().required().min(1000).max(1000000000),
  inventory: number().required().min(0).max(1000000),
  warranty: number().required().min(0).max(100),
  colors: array().of(object({
    price: number().required().min(0).max(1000000),
    name: string().required().min(3).max(15),
    code: string().required(),
  })).required().min(1).max(10),
  covers: object().required(),
  brand: string().required(),
  category: string().required(),
});

const update = object({
  title: string().required().min(5).max(100),
  price: number().required().min(1000).max(1000000000),
  inventory: number().required().min(0).max(1000000),
  warranty: number().required().min(0).max(100),
  colors: array().of(object({
    price: number().required().min(0).max(1000000),
    name: string().required().min(3).max(15),
    code: string().required(),
  })).required().min(1).max(10),
});

export { create, update };