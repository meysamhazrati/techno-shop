import { object, string } from "yup";

const validator = object({
  province: string().required("استان الزامی است.").min(2, "استان باید حداقل 2 کاراکتر باشد.").max(20, "استان باید حداکثر 20 کاراکتر باشد."),
  city: string().required("شهر الزامی است.").min(2, "شهر باید حداقل 2 کاراکتر باشد.").max(20, "شهر باید حداکثر 20 کاراکتر باشد."),
  postalCode: string().required("کدپستی الزامی است.").length(10, "کدپستی باید 10 رقم باشد.").matches(/^\d{10}$/, "کدپستی نامعتبر است."),
  body: string().required("متن الزامی است.").min(10, "متن باید حداقل 10 کاراکتر باشد.").max(100, "متن باید حداکثر 100 کاراکتر باشد."),
});

export default validator;