import { object, string, number } from "yup";

const validator = object({
  name: string().required().min(3).max(50),
  englishName: string().required().min(3).max(50),
  logo: object({
    mimetype: string().oneOf(["image/png", "image/jpg", "image/jpeg"]),
    size: number().max(20 * 1024 * 1024),
  }),
});

export default validator;