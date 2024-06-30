import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { register } from "../../axios/controllers/authentication";
import validator from "../../validators/authentication";

const useRegister = () => {
  const navigate = useNavigate();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: (body) => register(body),
    onMutate: async (body) => await validator.register.validate(body),
    onSuccess: ({ message }) => {
      navigate("/me");

      openToast("success", null, message);
    },
    onError: ({ message }) => openToast("error", null, message),
  });

  return { isPendingRegister: isPending, register: mutate };
};

export default useRegister;