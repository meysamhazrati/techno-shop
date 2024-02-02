import { object, string, number, array } from "yup";

const create = object({
  code: string().length(7).matches(/^[a-zA-Z\d]{7}$/),
  percent: number().required().min(1).max(100),
  minimumAmount: number().required().min(0).max(10000000),
  maximumUsage: number().required().min(1).max(1000000000),
  expiresAt: number().required().min(1).max(10000),
  categories: array().of(string()).required().min(1).max(7),
});

const check = object({
  code: string().required().length(7).matches(/^[a-zA-Z\d]{7}$/),
  amount: number().required().min(1000).max(10000000000),
  categories: array().of(string()).required().min(1).max(7),
});

export { create, check };