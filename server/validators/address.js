import { object, string } from "yup";

const validator = object({
  province: string().required().min(2).max(20),
  city: string().required().min(2).max(20),
  postalCode: string().required().length(10),
  body: string().required().min(10).max(100),
});

export default validator;