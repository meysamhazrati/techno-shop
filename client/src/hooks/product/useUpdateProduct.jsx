import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import { update } from "../../axios/controllers/product";
import validator from "../../validators/product";
import mobileValidator from "../../validators/mobile";
import tabletValidator from "../../validators/tablet";
import laptopValidator from "../../validators/laptop";
import monitorValidator from "../../validators/monitor";
import caseValidator from "../../validators/case";
import mouseValidator from "../../validators/mouse";
import keyboardValidator from "../../validators/keyboard";
import headphoneValidator from "../../validators/headphone";
import smartWatchValidator from "../../validators/smartWatch";
import consoleValidator from "../../validators/console";

const useUpdateProduct = (id, type) => {
  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPending, mutate } = useMutation({
    mutationFn: (body) => update(id, type, body),
    onMutate: async (body) => {
      if (type) {
        await validator.update.validate(body);

        switch (type) {
          case "Mobile": {
            await mobileValidator.validate(body);
            break;
          }
          case "Tablet": {
            await tabletValidator.validate(body);
            break;
          }
          case "Laptop": {
            await laptopValidator.validate(body);
            break;
          }
          case "Monitor": {
            await monitorValidator.validate(body);
            break;
          }
          case "Case": {
            await caseValidator.validate(body);
            break;
          }
          case "Mouse": {
            await mouseValidator.validate(body);
            break;
          }
          case "Keyboard": {
            await keyboardValidator.validate(body);
            break;
          }
          case "Headphone": {
            await headphoneValidator.validate(body);
            break;
          }
          case "SmartWatch": {
            await smartWatchValidator.validate(body);
            break;
          }
          case "Console": {
            await consoleValidator.validate(body);
            break;
          }
          default: {
            throw Object.assign(new Error("نوع محصول نامعتبر است."), { status: 400 });
          }
        }
      } else {
        throw Object.assign(new Error("نوع محصول الزامی است."), { status: 400 });
      }
    },
    onSuccess: ({ message }) => {
      client.invalidateQueries({ queryKey: ["products"] });

      openToast("success", null, message);
    },
    onError: ({ message }) => openToast("error", null, message),
  });

  return { isPendingUpdateProduct: isPending, updateProduct: mutate };
};

export default useUpdateProduct;
