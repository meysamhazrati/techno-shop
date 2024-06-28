import { object, string } from "yup";

const create = object({
  title: string().required("عنوان الزامی است.").min(3, "عنوان باید حداقل 3 کاراکتر باشد.").max(50, "عنوان باید حداکثر 50 کاراکتر باشد."),
  englishTitle: string().required("عنوان انگلیسی الزامی است.").min(3, "عنوان انگلیسی باید حداقل 3 کاراکتر باشد.").max(50, "عنوان انگلیسی باید حداکثر 50 کاراکتر باشد."),
  logo: object().required("لوگو الزامی است."),
});

const update = object({
  title: string().required("عنوان الزامی است.").min(3, "عنوان باید حداقل 3 کاراکتر باشد.").max(50, "عنوان باید حداکثر 50 کاراکتر باشد."),
  englishTitle: string().required("عنوان انگلیسی الزامی است.").min(3, "عنوان انگلیسی باید حداقل 3 کاراکتر باشد.").max(50, "عنوان انگلیسی باید حداکثر 50 کاراکتر باشد."),
});

export default { create, update };