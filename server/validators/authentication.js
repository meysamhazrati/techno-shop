import { object, string } from "yup";

const register = object({
  firstName: string().required().min(3).max(70),
  lastName: string().required().min(4).max(70),
  phone: string().required().length(11).matches(/^09\d{9}$/),
  email: string().required().min(10).max(100).matches(/^\w+([.-]?\w)*@\w+([.-]?\w)*\.[a-zA-Z]{2,4}$/),
  password: string().required().min(8).max(20).matches(/^[\w?!$._-]{8,20}$/),
});

const login = object({
  identifier: string().required(),
  password: string().required().min(8).max(20).matches(/^[\w?!$._-]{8,20}$/),
});

export { register, login };