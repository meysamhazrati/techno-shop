import { object, string, number, array } from "yup";

const validator = object({
  shippingCost: number().required().min(0).max(10000000),
  totalAmount: number().required().min(0).max(10000000000),
  products: array().of(object({
    quantity: number().required().min(1).max(100),
    color: object({
      name: string().required().min(3).max(15),
      code: string().required(),
    }).required(),
    product: string().required(),
  })).required().min(1).max(100),
  destination: string().required(),
});

export default validator;