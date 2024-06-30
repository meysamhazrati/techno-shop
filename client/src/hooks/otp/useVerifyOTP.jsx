import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { verify } from "../../axios/controllers/otp";
import validator from "../../validators/otp";

const useVerifyOTP = () => {
  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: (body) => verify(body),
    onMutate: async (body) => await validator.verify.validate(body),
    onSuccess: ({ message }) => openToast("success", null, message),
    onError: ({ message }) => openToast("error", null, message),
  });

  return { isPendingVerifyOTP: isPending, verifyOTP: mutate };
};

export default useVerifyOTP;