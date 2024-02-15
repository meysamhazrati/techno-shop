import { object, string, number, array } from "yup";

const validator = object({
  shippingCost: number().required().min(0).max(10000000),
  totalAmount: number().required().min(0).max(10000000000),
  products: array().of(object({
    quantity: number().required().min(1).max(100),
    product: string().required(),
    color: string().required(),
  })).required().min(1).max(100),
  destination: string().required(),
});

export default validator;