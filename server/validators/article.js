import { object, string, boolean } from "yup";

const create = object({
  title: string().required().min(5).max(100),
  cover: object().required(),
  body: string().required().min(100).max(10000),
  isPublished: boolean().required(),
  category: string().required(),
});

const update = object({
  title: string().required().min(5).max(100),
  body: string().required().min(100).max(10000),
});

export { create, update };