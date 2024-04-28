import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Context as ToastContext } from "../../contexts/Toast";
import { register } from "../../axios/controllers/authentication";

const shouldRetry = ({ response }) => !/400|401/.test(response.status);

export default () => {
  const { openToast } = useContext(ToastContext);
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationFn: ({ firstName, lastName, email, password }) => register({ firstName, lastName, email, password }),
    retry: (failureCount, error) => shouldRetry(error) && failureCount < 2,
    onSuccess: () => {
      openToast("success", null, "با موفقیت ثبت نام شدید.");
      navigate("/");
    },
    onError: ({ response }) => openToast("error", null, response.status === 400 ? "اطلاعات وارد شده معتبر نمی‌باشد." : response.status === 401 ? "ایمیل وارد شده تایید نشده است." : null),
  });

  return { isPendingRegister: isPending, register: mutate };
};