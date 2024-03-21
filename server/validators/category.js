import { object, string } from "yup";

const create = object({
  title: string().required().min(3).max(50),
  englishTitle: string().required().min(3).max(50),
  logo: object().required(),
});

const update = object({
  title: string().required().min(3).max(50),
  englishTitle: string().required().min(3).max(50),
});

export { create, update };