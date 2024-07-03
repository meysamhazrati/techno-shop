import { object, string, mixed, boolean, ValidationError } from "yup";

const create = object({
  title: string().required("عنوان الزامی است.").min(5, "عنوان باید حداقل 5 کاراکتر باشد.").max(100, "عنوان باید حداکثر 100 کاراکتر باشد."),
  cover: mixed().required("کاور الزامی است.").test(({ size, mimetype }) => {
    if (size <= 2 * 1024 * 1024) {
      if (["image/png", "image/jpg", "image/jpeg"].includes(mimetype)) {
        return true;
      } else {
        throw new ValidationError("فرمت کاور باید PNG، JPG یا JPEG باشد.");
      }
    } else {
      throw new ValidationError("حجم کاور باید حداکثر 2 مگابایت باشد.");
    }
  }),
  body: string().required("متن الزامی است.").min(100, "متن باید حداقل 100 کاراکتر باشد.").max(10000, "متن باید حداکثر 10000 کاراکتر باشد."),
  isPublished: boolean().required("وضعیت انتشار الزامی است."),
  category: string().required("دسته‌بندی‌ الزامی است.").matches(/^[a-fA-F\d]{24}$/, "دسته‌بندی‌ نامعتبر است."),
});

const update = object({
  title: string().required("عنوان الزامی است.").min(5, "عنوان باید حداقل 5 کاراکتر باشد.").max(100, "عنوان باید حداکثر 100 کاراکتر باشد."),
  cover: mixed().nullable().test((value) => {
    if (!value) {
      return true;
    } else {
      if (value.size <= 2 * 1024 * 1024) {
        if (["image/png", "image/jpg", "image/jpeg"].includes(value.mimetype)) {
          return true;
        } else {
          throw new ValidationError("فرمت کاور باید PNG، JPG یا JPEG باشد.");
        }
      } else {
        throw new ValidationError("حجم کاور باید حداکثر 2 مگابایت باشد.");
      }
    }
  }),
  body: string().required("متن الزامی است.").min(100, "متن باید حداقل 100 کاراکتر باشد.").max(10000, "متن باید حداکثر 10000 کاراکتر باشد."),
  category: string().required("دسته‌بندی‌ الزامی است.").matches(/^[a-fA-F\d]{24}$/, "دسته‌بندی‌ نامعتبر است."),
});

export default { create, update };