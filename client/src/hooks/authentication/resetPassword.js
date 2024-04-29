import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Context as ToastContext } from "../../contexts/Toast";
import { resetPassword } from "../../axios/controllers/authentication";

const shouldRetry = ({ response }) => !/400|401|409/.test(response.status);

export default () => {
  const { openToast } = useContext(ToastContext);
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationFn: ({ email, password }) => resetPassword({ email, password }),
    retry: (failureCount, error) => shouldRetry(error) && failureCount < 2,
    onSuccess: () => {
      openToast("success", null, "رمز عبور شما با موفقیت بازنشانی شد.");
      navigate("/");
    },
    onError: ({ response }) => openToast("error", null, response.status === 400 ? "اطلاعات وارد شده معتبر نمی‌باشد." : response.status === 401 ? "ایمیل وارد شده تایید نشده است." : response.status === 409 ? "این رمز عبور قبلا استفاده شده است." : null),
  });

  return { isPendingResetPassword: isPending, resetPassword: mutate };
};