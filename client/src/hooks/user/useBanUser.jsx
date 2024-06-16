import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { ban } from "../../axios/controllers/user";

const useBanUser = (id) => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: () => ban(id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["users"] });

      openToast("success", null, "کاربر مورد نظر با موفقیت ممنوع شد.")
    },
    onError: ({ response }) => openToast("error", null, response.status === 403 ? "شما دسترسی لازم ندارید." : response.status === 404 ? "کاربر مورد نظر پیدا نشد" : response.status === 409 ? "این کاربر از قبل ممنوع شده است." : null),
  });

  return { isPendingBanUser: isPending, banUser: mutate };
};

export default useBanUser;