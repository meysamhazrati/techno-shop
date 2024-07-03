import { object, string, mixed, ValidationError } from "yup";

const create = object({
  name: string().required("نام الزامی است.").min(3, "نام باید حداقل 3 کاراکتر باشد.").max(50, "نام باید حداکثر 50 کاراکتر باشد."),
  englishName: string().required("نام انگلیسی الزامی است.").min(3, "نام انگلیسی باید حداقل 3 کاراکتر باشد.").max(50, "نام انگلیسی باید حداکثر 50 کاراکتر باشد."),
  logo: mixed().required("لوگو الزامی است.").test(({ size, type }) => {
    if (size <= 2 * 1024 * 1024) {
      if (["image/png", "image/jpg", "image/jpeg"].includes(type)) {
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
  name: string().required("نام الزامی است.").min(3, "نام باید حداقل 3 کاراکتر باشد.").max(50, "نام باید حداکثر 50 کاراکتر باشد."),
  englishName: string().required("نام انگلیسی الزامی است.").min(3, "نام انگلیسی باید حداقل 3 کاراکتر باشد.").max(50, "نام انگلیسی باید حداکثر 50 کاراکتر باشد."),
  logo: mixed().nullable().test((value) => {
    if (!value) {
      return true;
    } else {
      if (value.size <= 2 * 1024 * 1024) {
        if (["image/png", "image/jpg", "image/jpeg"].includes(value.type)) {
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