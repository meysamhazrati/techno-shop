import { useState } from "react";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import useDeliverOrder from "../../hooks/order/useDeliverOrder";
import useCancelOrder from "../../hooks/order/useCancelOrder";
import useReturnOrder from "../../hooks/order/useReturnOrder";
import Modal from "../Modal";
import Confirm from "../Confirm";

const Order = ({ _id, totalPrice, status, products, buyer, createdAt }) => {
  const [isDeliverModalOpen, setIsDeliverModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);

  const client = useQueryClient();

  const { isPendingDeliverOrder, deliverOrder } = useDeliverOrder(_id);
  const { isPendingCancelOrder, cancelOrder } = useCancelOrder(_id);
  const { isPendingReturnOrder, returnOrder } = useReturnOrder(_id);

  return (
    <>
      <tr className="border-t border-zinc-200 [&>*]:h-[72px] [&>*]:px-5">
        <td>{totalPrice.toLocaleString()} تومان</td>
        <td>{products.reduce((previous, { quantity }) => previous + quantity, 0).toLocaleString()} محصول</td>
        <td>{status}</td>
        {buyer.firstName && buyer.lastName && (
          <td>
            <Link to={`/admin/users/${buyer._id}`} className="text-primary-900">{buyer.firstName} {buyer.lastName}</Link>
          </td>
        )}
        <td>{new Intl.DateTimeFormat("fa", { dateStyle: "medium" }).format(Date.parse(createdAt))}</td>
        <td>
          <div className="flex items-center justify-center gap-x-2 text-base">
            {status === "جاری" && (
              <>
                <button className="flex h-9 w-24 items-center justify-center rounded-full bg-green-500 text-white transition-colors hover:bg-green-400" onClick={() => setIsDeliverModalOpen(true)}>تحویل</button>
                <button className="flex h-9 w-24 items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-400" onClick={() => setIsCancelModalOpen(true)}>لغو</button>
              </>
            )}
            {status === "تحویل شده" && <button className="flex h-9 w-24 items-center justify-center rounded-full bg-zinc-500 text-white transition-colors hover:bg-zinc-400" onClick={() => setIsReturnModalOpen(true)}>مرجوع</button>}
            <Link to={`/admin/orders/${_id}`} className="flex h-9 w-24 items-center justify-center rounded-full bg-primary-900 text-white transition-colors hover:bg-primary-800">مشاهده</Link>
          </div>
        </td>
      </tr>
      {status === "جاری" && (
        <>
          <Modal isOpen={isDeliverModalOpen} onClose={() => setIsDeliverModalOpen(false)}>
            <Confirm title="این سفارش را تحویل می‌دهید؟" isPending={isPendingDeliverOrder} onCancel={() => setIsDeliverModalOpen(false)} onConfirm={() => deliverOrder(null, { onSuccess: () => {
              client.invalidateQueries({ queryKey: ["users", { id: buyer._id }] });
              setIsDeliverModalOpen(false);
            } })} />
          </Modal>
          <Modal isOpen={isCancelModalOpen} onClose={() => setIsCancelModalOpen(false)}>
            <Confirm title="این سفارش را لغو می‌کنید؟" isPending={isPendingCancelOrder} onCancel={() => setIsCancelModalOpen(false)} onConfirm={() => cancelOrder(null, { onSuccess: () => {
              client.invalidateQueries([{ queryKey: ["orders"] }, { queryKey: ["users", { id: buyer._id }] }]);
              setIsCancelModalOpen(false);
            } })} />
          </Modal>
        </>
      )}
      {status === "تحویل شده" && (
        <Modal isOpen={isReturnModalOpen} onClose={() => setIsReturnModalOpen(false)}>
          <Confirm title="این سفارش را مرجوع می‌کنید؟" isPending={isPendingReturnOrder} onCancel={() => setIsReturnModalOpen(false)} onConfirm={() => returnOrder(null, { onSuccess: () => {
            client.invalidateQueries([{ queryKey: ["orders"] }, { queryKey: ["users", { id: buyer._id }] }]);
            setIsReturnModalOpen(false);
          } })} />
        </Modal>
      )}
    </>
  );
};

export default Order;