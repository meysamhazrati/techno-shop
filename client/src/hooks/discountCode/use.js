import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { use } from "../../axios/controllers/discountCode";

const shouldRetry = ({ response }) => !/400|403|404|409|410/.test(response.status);

export default (code) => {
  const { openToast } = useContext(ToastContext);

  const { isPending, data, mutate } = useMutation({
    mutationFn: ({ price, categories }) => use(code, { price, categories }),
    retry: (failureCount, error) => shouldRetry(error) && failureCount < 2,
    onSuccess: () => openToast("success", null, "کد تخفیف با موفقیت اعمال شد."),
    onError: ({ response }) => {
      let message = "";
  
      switch (response.status) {
        case 400: {
          message = "اطلاعات وارد شده معتبر نمی‌باشد.";
          break;
        }
        case 403: {
          message = "حداکثر محدودیت استفاده از این کد تخفیف به اتمام رسیده است.";
          break;
        }
        case 404: {
          message = "کد تخفیف وارد شده معتبر نمی‌باشد.";
          break;
        }
        case 409: {
          message = response.message === "The total price of the product(s) is less than the minimum required price for using this discount code." ? "مبلغ کل محصول(ها) کمتر از حداقل مبلغ مورد نیاز برای استفاده از این کد تخفیف است." : "کد تخفیف وارد شده شامل این محصول(ها) نمی‌باشد.";
          break;
        }
        case 410: {
          message = "کد تخفیف وارد شده منقضی شده است.";
          break;
        }
        default: {
          message = null;
          break;
        }
      }
  
      openToast("error", null, message);
    },
  });

  return { isPendingUseDiscountCode: isPending, discountCode: data?.data.discountCode, useDiscountCode: mutate };
};