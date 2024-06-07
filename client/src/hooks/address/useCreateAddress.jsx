import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { create } from "../../axios/controllers/address";

const useCreateAddress = () => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: ({ province, city, postalCode, body }) => create({ province, city, postalCode, body }),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["me"] });
      
      openToast("success", null, "آدرس شما با موفقیت ثبت شد.");
    },
    onError: ({ response }) => openToast("error", null, response.status === 400 ? "اطلاعات وارد شده معتبر نمی‌باشند." : response.status === 403 ? "شما دسترسی لازم ندارید." : null),
  });

  return { isPendingCreateAddress: isPending, createAddress: mutate };
};

export default useCreateAddress;