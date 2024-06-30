import { object, string, number, ValidationError } from "yup";

const create = object({
  body: string().required("متن الزامی است.").min(5, "متن باید حداقل 5 کاراکتر باشد.").max(300, "متن باید حداکثر 300 کاراکتر باشد."),
  score: number().required("امتیاز الزامی است.").min(1, "امتیاز باید حداقل 1 باشد.").max(5, "امتیاز باید حداکثر 5 باشد."),
  product: string().matches(/^[a-fA-F\d]{24}$/, "محصول نامعتبر است."),
  article: string().matches(/^[a-fA-F\d]{24}$/, "مقاله نامعتبر است."),
}).test(({ product, article }) => {
  if (!product && !article) {
    throw new ValidationError("یکی از مقادیر محصول یا مقاله الزامی است.");
  } else if (product && article) {
    throw new ValidationError("فقط یکی از مقادیر محصول یا مقاله مجاز است.");
  } else {
    return true;
  }
});

const update = object({
  body: string().required("متن الزامی است.").min(5, "متن باید حداقل 5 کاراکتر باشد.").max(300, "متن باید حداکثر 300 کاراکتر باشد."),
  score: number().required("امتیاز الزامی است.").min(1, "امتیاز باید حداقل 1 باشد.").max(5, "امتیاز باید حداکثر 5 باشد."),
});

export default { create, update };