import { object, string, number, array } from "yup";

const create = object({
  title: string().required().min(5).max(100),
  englishTitle: string().required().min(5).max(100),
  description: string().required().min(10).max(200),
  percent: number().required().min(1).max(100),
  expiresAt: number().required().min(1).max(10000),
  categories: array().of(string()).required().min(1).max(7),
});

const update = object({
  title: string().required().min(5).max(100),
  englishTitle: string().required().min(5).max(100),
  description: string().required().min(10).max(200),
  percent: number().required().min(1).max(100),
  expiresAt: number().required().min(1).max(10000),
});

export { create, update };