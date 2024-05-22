import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { edit } from "../../axios/controllers/user";

const shouldRetry = ({ response }) => !/400|401/.test(response.status);

export default () => {
  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: ({ firstName, lastName, currentPassword, newPassword, avatar }) => edit({ firstName, lastName, currentPassword, newPassword, avatar }),
    retry: (failureCount, error) => shouldRetry(error) && failureCount < 2,
    onSuccess: () => openToast("success", null, "اطلاعات شما با موفقیت ویرایش شد."),
    onError: ({ response }) => openToast("error", null, response.status === 400 ? "اطلاعات وارد شده معتبر نمی‌باشد." : response.status === 401 ? "رمز عبور فعلی وارد شده معتبر نمی‌باشد." : null),
  });

  return { isPendingEditUser: isPending, editUser: mutate };
};