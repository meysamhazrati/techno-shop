import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { close } from "../../axios/controllers/ticket";

const useCloseTicket = (id) => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: () => close(id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["tickets"] });

      openToast("success", null, "تیکت مورد نظر با موفقیت بسته شد.");
    },
    onError: ({ response }) => openToast("error", null, response.status === 403 ? "شما دسترسی لازم ندارید." : response.status === 404 ? "تیکت مورد نظر پیدا نشد." : response.status === 409 ? "این تیکت از قبل بسته شده است." : null),
  });

  return { isPendingCloseTicket: isPending, closeTicket: mutate };
};

export default useCloseTicket;