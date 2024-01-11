import { object, string, number } from "yup";

const edit = object({
  firstName: string().required().min(3).max(70),
  lastName: string().required().min(4).max(70),
  currentPassword: string().min(8).max(20).matches(/^[\w?!$._-]{8,20}$/),
  newPassword: string().min(8).max(20).matches(/^[\w?!$._-]{8,20}$/),
  avatar: object({
    mimetype: string().oneOf(["image/png", "image/jpg", "image/jpeg"]),
    size: number().max(20 * 1024 * 1024),
  }),
});

const update = object({
  firstName: string().required().min(3).max(70),
  lastName: string().required().min(4).max(70),
  phone: string().required().length(11).matches(/^09\d{9}$/),
  email: string().required().min(10).max(100).matches(/^\w+([.-]?\w)*@\w+([.-]?\w)*\.[a-zA-Z]{2,4}$/),
  password: string().min(8).max(20).matches(/^[\w?!$._-]{8,20}$/),
  role: string().required().oneOf(["USER", "ADMIN"]),
  avatar: object({
    mimetype: string().oneOf(["image/png", "image/jpg", "image/jpeg"]),
    size: number().max(20 * 1024 * 1024),
  }),
});

export { edit, update };