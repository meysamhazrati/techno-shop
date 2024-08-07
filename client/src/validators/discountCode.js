import { object, string, number, array } from "yup";

const create = object({
  code: string().length(7, "کد باید 7 رقم باشد.").matches(/^[a-zA-Z\d]{7}$/, "کد نامعتبر است."),
  percent: number().required("درصد الزامی است.").min(1, "درصد باید حداقل 1 باشد.").max(100, "درصد باید حداکثر 100 باشد."),
  minimumPrice: number().required("حداقل مبلغ الزامی است.").min(0, "حداقل مبلغ باید حداقل 0 تومان باشد.").max(10000000, "حداقل مبلغ باید حداکثر 10000000 تومان باشد."),
  maximumUsage: number().required("حداکثر استفاده الزامی است.").min(1, "حداکثر استفاده باید حداقل 1 بار باشد.").max(1000000000, "حداکثر استفاده باید حداکثر 1000000000 بار باشد."),
  expiresAt: number().required("انقضا الزامی است.").min(1, "انقضا باید حداقل 1 ساعت باشد.").max(10000, "انقضا باید حداکثر 10000 ساعت باشد."),
  categories: array().required("دسته‌بندی‌ ها الزامی هستند.").min(1, "دسته‌بندی‌ ها باید حداقل 1 عدد باشند.").of(string().matches(/^[a-fA-F\d]{24}$/, "دسته‌بندی‌ نامعتبر است.")),
});

const use = object({
  price: number().required("مبلغ الزامی است.").min(1000, "مبلغ باید حداقل 1000 تومان باشد."),
  categories: array().required("دسته‌بندی‌ ها الزامی هستند.").min(1, "دسته‌بندی‌ ها باید حداقل 1 عدد باشند.").of(string().matches(/^[a-fA-F\d]{24}$/, "دسته‌بندی‌ نامعتبر است.")),
});

export default { create, use };