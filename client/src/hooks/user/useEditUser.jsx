import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { edit } from "../../axios/controllers/user";

const useEditUser = () => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: ({ firstName, lastName, currentPassword, newPassword, avatar }) => edit({ firstName, lastName, currentPassword, newPassword, avatar }),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["me"] });
      
      openToast("success", null, "اطلاعات شما با موفقیت ویرایش شد.");
    },
    onError: ({ response }) => openToast("error", null, response.status === 400 ? "اطلاعات وارد شده معتبر نمی‌باشند." : response.status === 401 ? "رمز عبور فعلی وارد شده معتبر نمی‌باشد." : response.status === 403 ? "شما دسترسی لازم ندارید." : null),
  });

  return { isPendingEditUser: isPending, editUser: mutate };
};

export default useEditUser;