import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { removeFromFavorites } from "../../axios/controllers/user";

const shouldRetry = ({ response }) => !/403|404|409/.test(response.status);

export default (id) => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: () => removeFromFavorites(id),
    retry: (failureCount, error) => shouldRetry(error) && failureCount < 2,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["me"] });
      openToast("success", null, "محصول مورد نظر با موفقیت از علاقه‌مندی های شما حذف شد.");
    },
    onError: ({ response }) => openToast("error", null, response.status === 403 ? "لطفا ابتدا وارد حساب کاربری خود شوید." : response.status === 404 ? "محصول مورد نظر پیدا نشد." : response.status === 409 ? "محصول مورد نظر در علاقه‌مندی های شما نمی‌باشد." : null),
  });

  return { isPendingRemoveFromFavorites: isPending, removeFromFavorites: mutate };
};