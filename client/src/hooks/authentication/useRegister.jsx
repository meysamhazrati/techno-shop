import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { register } from "../../axios/controllers/authentication";

const useRegister = () => {
  const navigate = useNavigate();
  
  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: ({ firstName, lastName, email, password }) => register({ firstName, lastName, email, password }),
    onSuccess: () => {
      navigate("/me");
      
      openToast("success", null, "با موفقیت ثبت نام شدید.");
    },
    onError: ({ response }) => openToast("error", null, response.status === 400 ? "اطلاعات وارد شده معتبر نمی‌باشند." : response.status === 401 ? "ایمیل وارد شده تایید نشده است." : null),
  });

  return { isPendingRegister: isPending, register: mutate };
};

export default useRegister;