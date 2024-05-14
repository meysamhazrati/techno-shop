import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { Context as ToastContext } from "../../contexts/Toast";
import { update } from "../../axios/controllers/address";

const shouldRetry = ({ response }) => !/400|403|404/.test(response.status);

export default (id) => {
  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: ({ province, city, postalCode, body }) => update(id, { province, city, postalCode, body }),
    retry: (failureCount, error) => shouldRetry(error) && failureCount < 2,
    onSuccess: () => openToast("success", null, "آدرس شما با موفقیت ویرایش شد."),
    onError: ({ response }) => openToast("error", null, response.status === 400 ? "اطلاعات وارد شده معتبر نمی‌باشد." : response.status === 403 ? "شما دسترسی لازم برای ویرایش این آدرس را ندارید." : response.status === 404 ? "آدرس مورد نظر پیدا نشد." : null),
  });

  return { isPendingUpdateAddress: isPending, updateAddress: mutate };
};