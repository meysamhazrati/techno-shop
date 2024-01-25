import { object, string } from "yup";

const create = object({
  name: string().required().min(3).max(50),
  englishName: string().required().min(3).max(50),
  logo: object().required(),
});

const update = object({
  name: string().required().min(3).max(50),
  englishName: string().required().min(3).max(50),
});

export { create, update };