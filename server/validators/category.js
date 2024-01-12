import { object, string } from "yup";

const validator = object({
  title: string().required().min(3).max(50),
  englishTitle: string().required().min(3).max(50),
});

export default validator;