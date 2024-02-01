import { object, string, number, ValidationError } from "yup";

const validator = object({
  body: string().required().min(5).max(300),
  score: number().required().min(1).max(5),
  product: string(),
  article: string(),
}).test(({ product, article }) => {
  if (!product && !article) {
    throw new ValidationError("one of the product or article fields is required.");
  } else if (product && article) {
    throw new ValidationError("only one of the product or article fields is allowed.");
  } else {
    return true;
  }
});

export default validator;