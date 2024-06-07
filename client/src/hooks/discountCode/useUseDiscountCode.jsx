import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { use } from "../../axios/controllers/discountCode";

const useUseDiscountCode = (code) => {
  const { openToast } = useContext(ToastContext);

  const { isPending, data, mutate } = useMutation({
    mutationFn: ({ price, categories }) => use(code, { price, categories }),
    onSuccess: () => openToast("success", null, "کد تخفیف با موفقیت اعمال شد."),
    onError: ({ response }) => openToast("error", null, response.status === 400 ? "اطلاعات وارد شده معتبر نمی‌باشند." : response.status === 403 ? response.data.message === "The maximum usage limit for this discount code has been reached." ? "حداکثر محدودیت استفاده از این کد تخفیف به اتمام رسیده است." : "شما دسترسی لازم ندارید." : response.status === 404 ? "کد تخفیف وارد شده معتبر نمی‌باشد." : response.status === 409 ? response.data.message === "The total price of the product(s) is less than the minimum required price for using this discount code." ? "مبلغ کل محصول(ها) کمتر از حداقل مبلغ مورد نیاز برای استفاده از این کد تخفیف است." : "کد تخفیف وارد شده شامل این محصول(ها) نمی‌باشد." : response.status === 410 ? "کد تخفیف وارد شده منقضی شده است." : null),
  });

  return { isPendingUseDiscountCode: isPending, discountCode: data?.data.discountCode, useDiscountCode: mutate };
};

export default useUseDiscountCode;