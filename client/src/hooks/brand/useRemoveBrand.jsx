import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { remove } from "../../axios/controllers/brand";

const useRemoveBrand = (id) => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: () => remove(id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["brands"] });

      openToast("success", null, "برند مورد نظر با موفقیت حذف شد.");
    },
    onError: ({ response }) => openToast("error", null, response.status === 403 ? "شما دسترسی لازم ندارید." : response.status === 404 ? "برند مورد نظر پیدا نشد." : null),
  });

  return { isPendingRemoveBrand: isPending, removeBrand: mutate };
};

export default useRemoveBrand;