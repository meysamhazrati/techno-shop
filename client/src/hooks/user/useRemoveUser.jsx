import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { remove } from "../../axios/controllers/user";

const useRemoveUser = (id) => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: () => remove(id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["users"] });

      openToast("success", null, "کاربر مورد نظر با موفقیت حذف شد.")
    },
    onError: ({ response }) => openToast("error", null, response.status === 403 ? "شما دسترسی لازم ندارید." : response.status === 404 ? "کاربر مورد نظر پیدا نشد." : null),
  });

  return { isPendingRemoveUser: isPending, removeUser: mutate };
};

export default useRemoveUser;