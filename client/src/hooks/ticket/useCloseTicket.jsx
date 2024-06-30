import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { close } from "../../axios/controllers/ticket";

const useCloseTicket = (id) => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: () => close(id),
    onSuccess: ({ message }) => {
      client.invalidateQueries({ queryKey: ["tickets"] });

      openToast("success", null, message);
    },
    onError: ({ message }) => openToast("error", null, message),
  });

  return { isPendingCloseTicket: isPending, closeTicket: mutate };
};

export default useCloseTicket;