import { object, string, number, array } from "yup";

const validator = object({
  totalPrice: number().required("مبلغ کل الزامی است.").min(0, "مبلغ کل باید حداقل 0 تومان باشد."),
  products: array().required("محصول ها الزامی هستند.").min(1, "محصول ها باید حداقل 1 عدد باشند.").max(100, "محصول ها باید حداکثر 100 عدد باشند.").of(object({
    quantity: number().required("تعداد محصول الزامی است.").min(1, "تعداد محصول باید حداقل 1 عدد باشد.").max(100, "تعداد محصول باید حداکثر 100 عدد باشد."),
    product: string().required("محصول الزامی است.").matches(/^[a-fA-F\d]{24}$/, "محصول نامعتبر است."),
    color: string().required("رنگ محصول الزامی است.").matches(/^[a-fA-F\d]{24}$/, "رنگ محصول نامعتبر است."),
  })),
  destination: string().required("مقصد الزامی است.").matches(/^[a-fA-F\d]{24}$/, "مقصد نامعتبر است."),
});

export default validator;