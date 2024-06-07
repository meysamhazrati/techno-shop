import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { login } from "../../axios/controllers/authentication";

const useLogin = () => {
  const navigate = useNavigate();
  
  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: () => {
      navigate("/me");

      openToast("success", null, "با موفقیت به حساب کاربری خود وارد شدید.");
    },
    onError: ({ response }) => openToast("error", null, response.status === 400 ? "اطلاعات وارد شده معتبر نمی‌باشند." : response.status === 401 ? "ایمیل یا رمز عبور وارد شده معتبر نمی‌باشد." : response.status === 403 ? "ایمیل وارد شده مسدود شده است." : null),
  });

  return { isPendingLogin: isPending, login: mutate };
};

export default useLogin;