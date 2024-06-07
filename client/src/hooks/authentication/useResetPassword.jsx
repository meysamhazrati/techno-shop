import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { resetPassword } from "../../axios/controllers/authentication";

const useResetPassword = () => {
  const navigate = useNavigate();
  
  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: ({ email, password }) => resetPassword({ email, password }),
    onSuccess: () => {
      navigate("/me/profile");
      
      openToast("success", null, "رمز عبور شما با موفقیت بازنشانی شد.");
    },
    onError: ({ response }) => openToast("error", null, response.status === 400 ? "اطلاعات وارد شده معتبر نمی‌باشند." : response.status === 401 ? "ایمیل وارد شده تایید نشده است." : response.status === 409 ? "این رمز عبور قبلا استفاده شده است." : null),
  });

  return { isPendingResetPassword: isPending, resetPassword: mutate };
};

export default useResetPassword;