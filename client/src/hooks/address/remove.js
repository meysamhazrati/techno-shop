import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { remove } from "../../axios/controllers/address";

const shouldRetry = ({ response }) => !/403|404/.test(response.status);

export default (id) => {
  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: () => remove(id),
    retry: (failureCount, error) => shouldRetry(error) && failureCount < 2,
    onSuccess: () => openToast("success", null, "آدرس مورد نظر با موفقیت حذف شد."),
    onError: ({ response }) => openToast("error", null, response.status === 403 ? "شما دسترسی لازم برای حذف این آدرس را ندارید." : response.status === 404 ? "آدرس مورد نظر پیدا نشد." : null),
  });

  return { isPendingRemoveAddress: isPending, removeAddress: mutate };
};