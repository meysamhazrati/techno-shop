import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { create } from "../../axios/controllers/favorite";

const useCreateFavorite = () => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: ({ product }) => create({ product }),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["me"] });

      openToast("success", null, "علاقه‌مندی شما با موفقیت اضافه شد.");
    },
    onError: ({ response }) => openToast("error", null, response.status === 400 ? "اطلاعات وارد شده معتبر نمی‌باشند." : response.status === 403 ? "شما دسترسی لازم ندارید." : response.status === 404 ? "محصول مورد نظر پیدا نشد." : response.status === 409 ? "این علاقه‌مندی از قبل اضافه شده است." : null),
  });

  return { isPendingCreateFavorite: isPending, createFavorite: mutate };
};

export default useCreateFavorite;