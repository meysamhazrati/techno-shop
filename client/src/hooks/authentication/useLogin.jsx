import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { login } from "../../axios/controllers/authentication";
import validator from "../../validators/authentication";

const useLogin = () => {
  const navigate = useNavigate();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: (body) => login(body),
    onMutate: async (body) => await validator.login.validate(body),
    onSuccess: ({ message }) => {
      navigate("/me");

      openToast("success", null, message);
    },
    onError: ({ message }) => openToast("error", null, message),
  });

  return { isPendingLogin: isPending, login: mutate };
};

export default useLogin;