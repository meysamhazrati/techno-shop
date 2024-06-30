import { object, string } from "yup";

const validator = object({ product: string().required("محصول الزامی است.").matches(/^[a-fA-F\d]{24}$/, "محصول نامعتبر است.") });

export default validator;