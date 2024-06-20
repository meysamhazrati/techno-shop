import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { remove } from "../../axios/controllers/ticket";

const useRemoveTicket = (id) => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: () => remove(id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["tickets"] });

      openToast("success", null, "تیکت مورد نظر با موفقیت حذف شد.")
    },
    onError: ({ response }) => openToast("error", null, response.status === 403 ? "شما دسترسی لازم ندارید." : response.status === 404 ? "تیکت مورد نظر پیدا نشد." : null),
  });

  return { isPendingRemoveTicket: isPending, removeTicket: mutate };
};

export default useRemoveTicket;