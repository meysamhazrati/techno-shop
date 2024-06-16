import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { unBan } from "../../axios/controllers/user";

const useUnBanUser = (id) => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: () => unBan(id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["users"] });

      openToast("success", null, "کاربر مورد نظر با موفقیت آزاد شد.")
    },
    onError: ({ response }) => openToast("error", null, response.status === 403 ? "شما دسترسی لازم ندارید." : response.status === 404 ? "کاربر مورد نظر پیدا نشد" : response.status === 409 ? "این کاربر ممنوع نشده است." : null),
  });

  return { isPendingUnBanUser: isPending, unBanUser: mutate };
};

export default useUnBanUser;