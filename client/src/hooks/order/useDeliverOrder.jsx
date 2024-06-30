import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { deliver } from "../../axios/controllers/order";

const useDeliverOrder = (id) => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: () => deliver(id),
    onSuccess: ({ message }) => {
      client.invalidateQueries({ queryKey: ["orders"] });

      openToast("success", null, message);
    },
    onError: ({ message }) => openToast("error", null, message),
  });

  return { isPendingDeliverOrder: isPending, deliverOrder: mutate };
};

export default useDeliverOrder;