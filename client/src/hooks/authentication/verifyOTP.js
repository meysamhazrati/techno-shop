import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { verifyOTP } from "../../axios/controllers/authentication";

const shouldRetry = ({ response }) => !/400|401|409|410|429/.test(response.status);

export default () => {
  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: ({ email, code }) => verifyOTP({ email, code }),
    retry: (failureCount, error) => shouldRetry(error) && failureCount < 2,
    onSuccess: () => openToast("success", null, "ایمیل شما با موفقیت تایید شد."),
    onError: ({ response }) => {
      let message = "";

      switch (response.status) {
        case 400: {
          message = "اطلاعات وارد شده معتبر نمی‌باشد.";
          break;
        }
        case 401: {
          message = "کد تایید وارد شده معتبر نمی‌باشد.";
          break;
        }
        case 409: {
          message = "هیچ کد تاییدی برای این ایمیل ارسال نشده است.";
          break;
        }
        case 410: {
          message = "کد تایید وارد شده منقضی شده است.";
          break;
        }
        case 429: {
          message = "تلاش های نادرست زیادی برای تایید این ایمیل انجام شده است.";
          break;
        }
        default: {
          message = null;
          break;
        }
      }
      
      openToast("error", null, message);
    },
  });

  return { isPendingVerifyOTP: isPending, verifyOTP: mutate };
};