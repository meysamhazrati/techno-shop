import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { update } from "../../axios/controllers/brand";

const useUpdateBrand = (id) => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: ({ name, englishName, logo }) => update(id, { name, englishName, logo }),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["brands"] });

      openToast("success", null, "برند مورد نظر با موفقیت ویرایش شد.");
    },
    onError: ({ response }) => openToast("error", null, response.status === 400 ? "اطلاعات وارد شده معتبر نمی‌باشند." : response.status === 403 ? "شما دسترسی لازم ندارید." : response.status === 404 ? "برند مورد نظر پیدا نشد." : null),
  });

  return { isPendingUpdateBrand: isPending, updateBrand: mutate };
};

export default useUpdateBrand;