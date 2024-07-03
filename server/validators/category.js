import { object, string, mixed, ValidationError } from "yup";

const create = object({
  title: string().required("عنوان الزامی است.").min(3, "عنوان باید حداقل 3 کاراکتر باشد.").max(50, "عنوان باید حداکثر 50 کاراکتر باشد."),
  englishTitle: string().required("عنوان انگلیسی الزامی است.").min(3, "عنوان انگلیسی باید حداقل 3 کاراکتر باشد.").max(50, "عنوان انگلیسی باید حداکثر 50 کاراکتر باشد."),
  logo: mixed().required("لوگو الزامی است.").test(({ size, mimetype }) => {
    if (size <= 2 * 1024 * 1024) {
      if (["image/png", "image/jpg", "image/jpeg"].includes(mimetype)) {
        return true;
      } else {
        throw new ValidationError("فرمت لوگو باید PNG، JPG یا JPEG باشد.");
      }
    } else {
      throw new ValidationError("حجم لوگو باید حداکثر 2 مگابایت باشد.");
    }
  }),
});

const update = object({
  title: string().required("عنوان الزامی است.").min(3, "عنوان باید حداقل 3 کاراکتر باشد.").max(50, "عنوان باید حداکثر 50 کاراکتر باشد."),
  englishTitle: string().required("عنوان انگلیسی الزامی است.").min(3, "عنوان انگلیسی باید حداقل 3 کاراکتر باشد.").max(50, "عنوان انگلیسی باید حداکثر 50 کاراکتر باشد."),
  logo: mixed().nullable().test((value) => {
    if (!value) {
      return true;
    } else {
      if (value.size <= 2 * 1024 * 1024) {
        if (["image/png", "image/jpg", "image/jpeg"].includes(value.mimetype)) {
          return true;
        } else {
          throw new ValidationError("فرمت لوگو باید PNG، JPG یا JPEG باشد.");
        }
      } else {
        throw new ValidationError("حجم لوگو باید حداکثر 2 مگابایت باشد.");
      }
    }
  }),
});

export default { create, update };