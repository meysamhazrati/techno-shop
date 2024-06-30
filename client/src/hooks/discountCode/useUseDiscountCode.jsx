import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { use } from "../../axios/controllers/discountCode";
import validator from "../../validators/discountCode";

const useUseDiscountCode = (code) => {
  const { openToast } = useContext(ToastContext);

  const { isPending, data, mutate } = useMutation({
    mutationFn: (body) => use(code, body),
    onMutate: async (body) => await validator.use.validate(body),
    onSuccess: ({ message }) => openToast("success", null, message),
    onError: ({ message }) => openToast("error", null, message),
  });

  return { isPendingUseDiscountCode: isPending, discountCode: data?.data.discountCode, useDiscountCode: mutate };
};

export default useUseDiscountCode;