import { useState } from "react";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import useOpenTicket from "../../hooks/ticket/useOpenTicket";
import useCloseTicket from "../../hooks/ticket/useCloseTicket";
import useRemoveTicket from "../../hooks/ticket/useRemoveTicket";
import Modal from "../Modal";
import Confirm from "../Confirm";

const Ticket = ({ _id, title, department, isOpen, sender, createdAt }) => {
  const [isOpenModalOpen, setIsOpenModalOpen] = useState(false);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const client = useQueryClient();

  const { isPendingOpenTicket, openTicket } = useOpenTicket(_id);
  const { isPendingCloseTicket, closeTicket } = useCloseTicket(_id);
  const { isPendingRemoveTicket, removeTicket } = useRemoveTicket(_id);

  return (
    <>
      <tr className="border-t border-zinc-200 [&>*]:h-[72px] [&>*]:px-5">
        <td>{title}</td>
        <td>{department === "Management" ? "مدیریت" : department === "Finance" ? "مالی" : department === "Order Tracking" ? "پیگیری سفارش" : department === "Support" ? "پشتیبانی" : department === "Feedback" ? "بازخورد" : "سایر"}</td>
        <td>{isOpen ? "باز" : "بسته شده"}</td>
        {sender.firstName && sender.lastName && (
          <td>
            <Link to={`/admin/users/${sender._id}`} className="text-primary-900">{sender.firstName} {sender.lastName}</Link>
          </td>
        )}
        <td>{new Intl.DateTimeFormat("fa", { dateStyle: "medium" }).format(Date.parse(createdAt))}</td>
        <td>
          <div className="flex items-center justify-center gap-x-2 text-base">
            {isOpen ? <button className="flex h-9 w-24 items-center justify-center rounded-full bg-yellow-400 text-white transition-colors hover:bg-yellow-300" onClick={() => setIsCloseModalOpen(true)}>بستن</button> : <button className="flex h-9 w-24 items-center justify-center rounded-full bg-yellow-400 text-white transition-colors hover:bg-yellow-300" onClick={() => setIsOpenModalOpen(true)}>باز</button>}
            <button className="flex h-9 w-24 items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-400" onClick={() => setIsRemoveModalOpen(true)}>حذف</button>
            <Link to={`/admin/tickets/${_id}`} className="flex h-9 w-24 items-center justify-center rounded-full bg-primary-900 text-base text-white transition-colors hover:bg-primary-800">مشاهده</Link>
          </div>
        </td>
      </tr>
      {isOpen ? (
        <Modal isOpen={isCloseModalOpen} onClose={() => setIsCloseModalOpen(false)}>
          <Confirm title="این تیکت را میبندید؟" isPending={isPendingCloseTicket} onCancel={() => setIsCloseModalOpen(false)} onConfirm={() => closeTicket(null, { onSuccess: () => {
            client.invalidateQueries({ queryKey: ["users", { id: sender._id || sender }] });
            setIsCloseModalOpen(false);
          } })} />
        </Modal>
      ) : (
        <Modal isOpen={isOpenModalOpen} onClose={() => setIsOpenModalOpen(false)}>
          <Confirm title="این تیکت را باز می‌کنید؟" isPending={isPendingOpenTicket} onCancel={() => setIsOpenModalOpen(false)} onConfirm={() => openTicket(null, { onSuccess: () => {
            client.invalidateQueries({ queryKey: ["users", { id: sender._id || sender }] });
            setIsOpenModalOpen(false);
          } })} />
        </Modal>
      )}
      <Modal isOpen={isRemoveModalOpen} onClose={() => setIsRemoveModalOpen(false)}>
        <Confirm title="این تیکت را حذف می‌کنید؟" isPending={isPendingRemoveTicket} onCancel={() => setIsRemoveModalOpen(false)} onConfirm={() => removeTicket(null, { onSuccess: () => {
          client.invalidateQueries({ queryKey: ["users", { id: sender._id || sender }] });
          setIsRemoveModalOpen(false);
        } })} />
      </Modal>
    </>
  );
};

export default Ticket;