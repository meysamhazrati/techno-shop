import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { unBan } from "../../axios/controllers/user";

const useUnBanUser = (id) => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: () => unBan(id),
    onSuccess: ({ message }) => {
      client.invalidateQueries({ queryKey: ["users"] });

      openToast("success", null, message);
    },
    onError: ({ message }) => openToast("error", null, message),
  });

  return { isPendingUnBanUser: isPending, unBanUser: mutate };
};

export default useUnBanUser;