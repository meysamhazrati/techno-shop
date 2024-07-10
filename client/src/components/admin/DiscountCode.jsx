import { useState } from "react";
import { Link } from "react-router-dom";
import useRemoveDiscountCode from "../../hooks/discountCode/useRemoveDiscountCode";
import Modal from "../Modal";
import Confirm from "../Confirm";

const DiscountCode = ({ _id, code, percent, minimumPrice, usages, maximumUsage, creator, expiresAt, createdAt }) => {
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const { isPendingRemoveDiscountCode, removeDiscountCode } = useRemoveDiscountCode(_id);

  return (
    <>
      <tr className="border-t border-zinc-200 [&>*]:h-[72px] [&>*]:px-5">
        <td>{code}</td>
        <td>{percent} درصد</td>
        <td>{minimumPrice} تومان</td>
        <td>{usages} عدد</td>
        <td>{maximumUsage} عدد</td>
        <td>
          <Link to={`/admin/users/${creator._id}`} className="text-primary-900">{creator.firstName} {creator.lastName}</Link>
        </td>
        <td>{new Intl.DateTimeFormat("fa", { dateStyle: "medium" }).format(Date.parse(createdAt))}</td>
        <td>{new Intl.DateTimeFormat("fa", { dateStyle: "medium" }).format(Date.parse(expiresAt))}</td>
        <td>
          <button className="flex h-9 w-24 items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-400" onClick={() => setIsRemoveModalOpen(true)}>حذف</button>
        </td>
      </tr>
      <Modal isOpen={isRemoveModalOpen} onClose={() => setIsRemoveModalOpen(false)}>
        <Confirm title="این کد‌تخفیف را حذف می‌کنید؟" isPending={isPendingRemoveDiscountCode} onCancel={() => setIsRemoveModalOpen(false)} onConfirm={() => removeDiscountCode(null, { onSuccess: () => setIsRemoveModalOpen(false) })} />
      </Modal>
    </>
  );
};

export default DiscountCode;