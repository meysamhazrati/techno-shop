import { object, string } from "yup";

const create = object({
  name: string().required("نام الزامی است.").min(3, "نام باید حداقل 3 کاراکتر باشد.").max(50, "نام باید حداکثر 50 کاراکتر باشد."),
  englishName: string().required("نام انگلیسی الزامی است.").min(3, "نام انگلیسی باید حداقل 3 کاراکتر باشد.").max(50, "نام انگلیسی باید حداکثر 50 کاراکتر باشد."),
  logo: object().required("لوگو الزامی است."),
});

const update = object({
  name: string().required("نام الزامی است.").min(3, "نام باید حداقل 3 کاراکتر باشد.").max(50, "نام باید حداکثر 50 کاراکتر باشد."),
  englishName: string().required("نام انگلیسی الزامی است.").min(3, "نام انگلیسی باید حداقل 3 کاراکتر باشد.").max(50, "نام انگلیسی باید حداکثر 50 کاراکتر باشد."),
});

export default { create, update };