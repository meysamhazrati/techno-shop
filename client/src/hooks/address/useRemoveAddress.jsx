import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { remove } from "../../axios/controllers/address";

const useRemoveAddress = (id) => {
  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: () => remove(id),
    onSuccess: () => openToast("success", null, "آدرس مورد نظر با موفقیت حذف شد."),
    onError: ({ response }) => openToast("error", null, response.status === 403 ? "شما دسترسی لازم ندارید." : response.status === 404 ? "آدرس مورد نظر پیدا نشد." : null),
  });

  return { isPendingRemoveAddress: isPending, removeAddress: mutate };
};

export default useRemoveAddress;