import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { verifyOTP } from "../../axios/controllers/authentication";

const useVerifyOTP = () => {
  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: ({ email, code }) => verifyOTP({ email, code }),
    onSuccess: () => openToast("success", null, "ایمیل شما با موفقیت تایید شد."),
    onError: ({ response }) => openToast("error", null, response.status === 400 ? "اطلاعات وارد شده معتبر نمی‌باشند." : response.status === 401 ? "کد تایید وارد شده معتبر نمی‌باشد." : response.status === 409 ? "هیچ کد تاییدی برای این ایمیل ارسال نشده است." : response.status === 410 ? "کد تایید وارد شده منقضی شده است." : response.status === 429 ? "تلاش های نادرست زیادی برای تایید این ایمیل انجام شده است." : null),
  });

  return { isPendingVerifyOTP: isPending, verifyOTP: mutate };
};

export default useVerifyOTP;