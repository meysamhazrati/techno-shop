import { object, string, number, array } from "yup";

const validator = object({
  totalPrice: number().required().min(0),
  products: array().of(object({
    quantity: number().required().min(1).max(100),
    product: string().required(),
    color: string().required(),
  })).required().min(1).max(100),
  destination: string().required(),
});

export default validator;