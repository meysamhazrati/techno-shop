import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { update } from "../../axios/controllers/address";

const useUpdateAddress = (id) => {
  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: ({ province, city, postalCode, body }) => update(id, { province, city, postalCode, body }),
    onSuccess: () => openToast("success", null, "آدرس مورد نظر با موفقیت ویرایش شد."),
    onError: ({ response }) => openToast("error", null, response.status === 400 ? "اطلاعات وارد شده معتبر نمی‌باشند." : response.status === 403 ? "شما دسترسی لازم ندارید." : response.status === 404 ? "آدرس مورد نظر پیدا نشد." : null),
  });

  return { isPendingUpdateAddress: isPending, updateAddress: mutate };
};

export default useUpdateAddress;