import { object, string, number, array, mixed, ValidationError } from "yup";

const create = object({
  title: string().required("عنوان الزامی است.").min(5, "عنوان باید حداقل 5 کاراکتر باشد.").max(100, "عنوان باید حداکثر 100 کاراکتر باشد."),
  warranty: number().max(100, "گارانتی باید حداکثر 100 ماه باشد."),
  colors: array().required("رنگ ها الزامی هستند.").min(1, "رنگ ها باید حداقل 1 عدد باشند.").max(10, "رنگ ها باید حداکثر 10 عدد باشند.").of(object({
    price: number().required("مبلغ رنگ الزامی است.").min(1000, "مبلغ رنگ باید حداقل 1000 تومان باشد.").max(1000000000, "مبلغ رنگ باید حداکثر 1000000000 تومان باشد."),
    inventory: number().required("موجودی رنگ الزامی است.").min(1, "موجودی رنگ باید حداقل 1 عدد باشد.").max(100000, "موجودی رنگ باید حداکثر 100000 عدد باشد."),
    name: string().required("نام رنگ الزامی است.").min(3, "نام رنگ باید حداقل 3 کاراکتر باشد.").max(15, "نام رنگ باید حداکثر 15 کاراکتر باشد."),
    code: string().required("کد رنگ الزامی است."),
  })),
  covers: array().required("کاور ها الزامی هستند.").length(4, "کاور ها باید 4 عدد باشند.").of(mixed().test(({ size, type }) => {
    if (size <= 2 * 1024 * 1024) {
      if (["image/png", "image/jpg", "image/jpeg"].includes(type)) {
        return true;
      } else {
        throw new ValidationError("فرمت کاور باید PNG، JPG یا JPEG باشد.");
      }
    } else {
      throw new ValidationError("حجم کاور باید حداکثر 2 مگابایت باشد.");
    }
  })),
  brand: string().required("برند الزامی است.").matches(/^[a-fA-F\d]{24}$/, "برند نامعتبر است."),
  category: string().required("دسته‌بندی‌ الزامی است.").matches(/^[a-fA-F\d]{24}$/, "دسته‌بندی‌ نامعتبر است."),
});

const update = object({
  title: string().required("عنوان الزامی است.").min(5, "عنوان باید حداقل 5 کاراکتر باشد.").max(100, "عنوان باید حداکثر 100 کاراکتر باشد."),
  warranty: number().max(100, "گارانتی باید حداکثر 100 ماه باشد."),
  colors: array().required("رنگ ها الزامی هستند.").min(1, "رنگ ها باید حداقل 1 عدد باشند.").max(10, "رنگ ها باید حداکثر 10 عدد باشند.").of(object({
    price: number().required("مبلغ رنگ الزامی است.").min(1000, "مبلغ رنگ باید حداقل 1000 تومان باشد.").max(1000000000, "مبلغ رنگ باید حداکثر 1000000000 تومان باشد."),
    inventory: number().required("موجودی رنگ الزامی است.").min(1, "موجودی رنگ باید حداقل 1 عدد باشد.").max(100000, "موجودی رنگ باید حداکثر 100000 عدد باشد."),
    name: string().required("نام رنگ الزامی است.").min(3, "نام رنگ باید حداقل 3 کاراکتر باشد.").max(15, "نام رنگ باید حداکثر 15 کاراکتر باشد."),
    code: string().required("کد رنگ الزامی است."),
  })),
  brand: string().required("برند الزامی است.").matches(/^[a-fA-F\d]{24}$/, "برند نامعتبر است."),
  category: string().required("دسته‌بندی‌ الزامی است.").matches(/^[a-fA-F\d]{24}$/, "دسته‌بندی‌ نامعتبر است."),
});

export default { create, update };