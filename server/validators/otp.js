import { object, string } from "yup";

const send = object({
  email: string().required().min(10).max(100).matches(/^\w+([.-]?\w)*@\w+([.-]?\w)*\.[a-zA-Z]{2,4}$/),
});

const verify = object({
  email: string().required().min(10).max(100).matches(/^\w+([.-]?\w)*@\w+([.-]?\w)*\.[a-zA-Z]{2,4}$/),
  code: string().required().length(7).matches(/^\d{7}$/),
});

export { send, verify };