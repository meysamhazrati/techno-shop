import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { resetPassword } from "../../axios/controllers/authentication";
import validator from "../../validators/authentication";

const useResetPassword = () => {
  const navigate = useNavigate();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: (body) => resetPassword(body),
    onMutate: async (body) => await validator.resetPassword.validate(body),
    onSuccess: ({ message }) => {
      navigate("/me/profile");

      openToast("success", null, message);
    },
    onError: ({ message }) => openToast("error", null, message),
  });

  return { isPendingResetPassword: isPending, resetPassword: mutate };
};

export default useResetPassword;