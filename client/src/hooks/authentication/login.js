import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Context as ToastContext } from "../../contexts/Toast";
import { login } from "../../axios/controllers/authentication";

const shouldRetry = ({ response }) => !/400|401|403/.test(response.status);

export default () => {
  const { openToast } = useContext(ToastContext);
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    retry: (failureCount, error) => shouldRetry(error) && failureCount < 2,
    onSuccess: () => {
      openToast("success", null, "با موفقیت به حساب کاربری خود وارد شدید.");
      navigate("/");
    },
    onError: ({ response }) => openToast("error", null, response.status === 400 ? "اطلاعات وارد شده معتبر نمی‌باشد." : response.status === 401 ? "ایمیل یا رمز عبور وارد شده معتبر نمی‌باشد." : response.status === 403 ? "این ایمیل مسدود شده است." : null),
  });

  return { isPendingLogin: isPending, login: mutate };
};