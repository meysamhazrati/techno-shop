import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { send } from "../../axios/controllers/otp";
import validator from "../../validators/otp";

const useSendOTP = (type) => {
  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: (body) => send(type, body),
    onMutate: async (body) => await validator.send.validate(body),
    onSuccess: ({ message }) => openToast("success", null, message),
    onError: ({ message }) => openToast("error", null, message),
  });

  return { isPendingSendOTP: isPending, sendOTP: mutate };
};

export default useSendOTP;