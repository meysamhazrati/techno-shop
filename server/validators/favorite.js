import { object, string } from "yup";

const validator = object({ product: string().required() });

export default validator;