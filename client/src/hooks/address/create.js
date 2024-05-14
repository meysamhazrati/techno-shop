import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Context as ToastContext } from "../../contexts/Toast";
import { create } from "../../axios/controllers/address";

const shouldRetry = ({ response }) => response.status !== 400;

export default () => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: ({ province, city, postalCode, body }) => create({ province, city, postalCode, body }),
    retry: (failureCount, error) => shouldRetry(error) && failureCount < 2,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["me"] });
      openToast("success", null, "آدرس شما با موفقیت ثبت شد.");
    },
    onError: ({ response }) => openToast("error", null, response.status === 400 ? "اطلاعات وارد شده معتبر نمی‌باشد." : null),
  });

  return { isPendingCreateAddress: isPending, createAddress: mutate };
};