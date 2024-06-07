import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { sendOTP } from "../../axios/controllers/authentication";

const useSendOTP = (type) => {
  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: ({ email }) => sendOTP({ email }, type),
    onSuccess: () => openToast("success", null, "کد تایید با موفقیت به ایمیل شما ارسال شد."),
    onError: ({ response }) => openToast("error", null, response.status === 400 ? "اطلاعات وارد شده معتبر نمی‌باشند." : response.status === 403 ? "این ایمیل به دلیل درخواست های مکرر تا چند ساعت مسدود شده است." : response.status === 409 ? type === "reset-password" ? "ایمیل وارد شده معتبر نمی‌باشد." : "ایمیل وارد شده از قبل وجود دارد." : null),
  });

  return { isPendingSendOTP: isPending, sendOTP: mutate };
};

export default useSendOTP;