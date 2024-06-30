import { object, string } from "yup";

const send = object({
  email: string().required("ایمیل الزامی است.").min(10, "ایمیل باید حداقل 10 کاراکتر باشد.").max(100, "ایمیل باید حداکثر 100 کاراکتر باشد.").matches(/^\w+([.-]?\w)*@\w+([.-]?\w)*\.[a-zA-Z]{2,4}$/, "ایمیل نامعتبر است."),
});

const verify = object({
  email: string().required("ایمیل الزامی است.").min(10, "ایمیل باید حداقل 10 کاراکتر باشد.").max(100, "ایمیل باید حداکثر 100 کاراکتر باشد.").matches(/^\w+([.-]?\w)*@\w+([.-]?\w)*\.[a-zA-Z]{2,4}$/, "ایمیل نامعتبر است."),
  code: string().required("کد تایید الزامی است.").length(7, "کد تایید باید 7 رقم باشد.").matches(/^\d{7}$/, "کد تایید نامعتبر است."),
});

export default { send, verify };