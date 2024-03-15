import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Context as ToastContext } from "../../contexts/Toast";
import { logout } from "../../axios/controllers/authentication";

export default () => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      client.invalidateQueries(["me"]);
      openToast("success", "موفق!", "با موفقیت از حساب کاربری خود خارج شدید.");
    },
    onError: () => openToast("error", "خطا!", "مشکلی پیش آمد! لطفا بعدا دوباره تلاش کنید."),
  });

  return { logout: mutate };
};