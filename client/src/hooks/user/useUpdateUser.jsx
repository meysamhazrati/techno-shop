import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { update } from "../../axios/controllers/user";

const useUpdateUser = (id) => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: ({ firstName, lastName, email, password, role, avatar }) => update(id, { firstName, lastName, email, password, role, avatar }),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["users"] });

      openToast("success", null, "کاربر مورد نظر با موفقیت ویرایش شد.")
    },
    onError: ({ response }) => openToast("error", null, response.status === 400 ? "اطلاعات وارد شده معتبر نمی‌باشند." : response.status === 403 ? "شما دسترسی لازم ندارید." : response.status === 404 ? "کاربر مورد نظر پیدا نشد." : response.status === 409 ? "ایمیل وارد شده از قبل وجود دارد." : null),
  });

  return { isPendingUpdateUser: isPending, updateUser: mutate };
};

export default useUpdateUser;