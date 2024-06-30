import { object, string, boolean } from "yup";

const create = object({
  title: string().required("عنوان الزامی است.").min(5, "عنوان باید حداقل 5 کاراکتر باشد.").max(100, "عنوان باید حداکثر 100 کاراکتر باشد."),
  cover: object().required("کاور الزامی است."),
  body: string().required("متن الزامی است.").min(100, "متن باید حداقل 100 کاراکتر باشد.").max(10000, "متن باید حداکثر 10000 کاراکتر باشد."),
  isPublished: boolean().required("وضعیت انتشار الزامی است."),
  category: string().required("دسته‌بندی‌ الزامی است.").matches(/^[a-fA-F\d]{24}$/, "دسته‌بندی‌ نامعتبر است."),
});

const update = object({
  title: string().required("عنوان الزامی است.").min(5, "عنوان باید حداقل 5 کاراکتر باشد.").max(100, "عنوان باید حداکثر 100 کاراکتر باشد."),
  body: string().required("متن الزامی است.").min(100, "متن باید حداقل 100 کاراکتر باشد.").max(10000, "متن باید حداکثر 10000 کاراکتر باشد."),
  category: string().required("دسته‌بندی‌ الزامی است.").matches(/^[a-fA-F\d]{24}$/, "دسته‌بندی‌ نامعتبر است."),
});

export default { create, update };