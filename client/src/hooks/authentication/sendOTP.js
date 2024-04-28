import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { Context as ToastContext } from "../../contexts/Toast";
import { sendOTP } from "../../axios/controllers/authentication";

const shouldRetry = ({ response }) => !/400|403|409/.test(response.status);

export default (type) => {
  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: ({ email }) => sendOTP({ email }, type),
    retry: (failureCount, error) => shouldRetry(error) && failureCount < 2,
    onSuccess: () => openToast("success", null, "کد تایید با موفقیت به ایمیل شما ارسال شد."),
    onError: ({ response }) => {
      let message = "";

      switch (response.status) {
        case 400: {
          message = "اطلاعات وارد شده معتبر نمی‌باشد.";
          break;
        }
        case 403: {
          message = "این ایمیل به دلیل درخواست های مکرر تا چند ساعت مسدود شده است.";
          break;
        }
        case 409: {
          message = type === "reset-password" ? "ایمیل وارد شده معتبر نمی‌باشد." : "ایمیل وارد شده از قبل وجود دارد.";
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

  return { isPendingSendOTP: isPending, sendOTP: mutate };
};