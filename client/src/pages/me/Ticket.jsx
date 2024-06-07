import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
import useTicket from "../../hooks/ticket/useTicket";
import useReplyTicket from "../../hooks/ticket/useReplyTicket";
import Loader from "../../components/Loader";

const Ticket = () => {
  const { id } = useParams();

  const [body, setBody] = useState("");

  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isFetchingTicket, isTicketError, ticket } = useTicket(id);
  const { isPendingReplyTicket, replyTicket } = useReplyTicket(id);

  useEffect(() => {
    document.title = isTicketError || isFetchingTicket ? "تکنوشاپ - من" : `تکنوشاپ - من - ${ticket.title}`;
  }, [isTicketError, isFetchingTicket, ticket]);

  useEffect(() => {
    if (isTicketError) {
      throw Object.assign(new Error("The ticket was not found."), { status: 404 });
    }
  }, [isTicketError]);

  const submit = (event) => {
    event.preventDefault();

    if (body.trim().length >= 5 && body.trim().length <= 300) {
      replyTicket({ body: body.trim() }, { onSuccess: () => {
        client.invalidateQueries({ queryKey: ["ticket", { id }] });
        setBody("");
      } });
    } else {
      openToast("error", null, "متن باید بین 5 تا 300 حروف باشد.");
    }
  };

  return !isTicketError && (
    <>
      <div className="mb-6 flex flex-col gap-3 overflow-auto text-nowrap border-b border-zinc-200 pb-6 text-lg sm:flex-row sm:items-center">
        <div className="flex items-center gap-x-2">
          <span className="text-zinc-400">عنوان:</span>
          <span>{isFetchingTicket ? "در حال بارگذاری" : ticket.title}</span>
        </div>
        <div className="hidden size-1.5 shrink-0 rounded-full bg-zinc-400 sm:block"></div>
        <div className="flex items-center gap-x-2">
          <span className="text-zinc-400">دپارتمان:</span>
          <span>{isFetchingTicket ? "در حال بارگذاری" : ticket.department === "Management" ? "مدیریت" : ticket?.department === "Finance" ? "مالی" : ticket?.department === "Order Tracking" ? "پیگیری سفارش" : ticket?.department === "Support" ? "پشتیبانی" : ticket?.department === "Feedback" ? "بازخورد" : "سایر"}</span>
        </div>
        <div className="hidden size-1.5 shrink-0 rounded-full bg-zinc-400 sm:block"></div>
        <div className="flex items-center gap-x-2">
          <span className="text-zinc-400">وضعیت:</span>
          <span>{isFetchingTicket ? "در حال بارگذاری" : ticket.isOpen ? "باز" : "بسته شده"}</span>
        </div>
        <div className="hidden size-1.5 shrink-0 rounded-full bg-zinc-400 sm:block"></div>
        <div className="flex items-center gap-x-2">
          <span className="text-zinc-400">تاریخ ثبت:</span>
          <span>{isFetchingTicket ? "در حال بارگذاری" : new Intl.DateTimeFormat("fa", { dateStyle: "medium" }).format(Date.parse(ticket.createdAt))}</span>
        </div>
      </div>
      <div className="w-11/12 rounded-bl-3xl rounded-tl-3xl rounded-tr-3xl bg-primary-900 p-4 text-white">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h6 className="font-vazirmatn-medium text-lg">{isFetchingTicket ? "در حال بارگذاری" : `${ticket.sender.firstName} ${ticket.sender.lastName}`}</h6>
          <span className="text-zinc-200">{isFetchingTicket ? "در حال بارگذاری" : new Intl.DateTimeFormat("fa", { dateStyle: "medium" }).format(Date.parse(ticket.createdAt))}</span>
        </div>
        <p className="my-2 text-lg" dangerouslySetInnerHTML={{ __html: isFetchingTicket ? "در حال بارگذاری" : ticket.body.replaceAll("\n", "<br />") }}></p>
        <span className="text-zinc-200">{isFetchingTicket ? "در حال بارگذاری" : new Intl.DateTimeFormat("fa", { hour: "2-digit", minute: "2-digit", hour12: true }).format(Date.parse(ticket.createdAt))}</span>
      </div>
      {ticket?.replies.map(({ _id, body, sender, createdAt }) => (
        <div key={_id} className={`mt-6 w-11/12 rounded-tl-3xl rounded-tr-3xl p-4 ${sender._id === ticket.sender._id ? "ml-auto rounded-bl-3xl bg-primary-900 text-white" : "mr-auto rounded-br-3xl bg-zinc-200 text-zinc-700"}`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h6 className="font-vazirmatn-medium text-lg">{ticket.sender.firstName} {ticket.sender.lastName}</h6>
            <span className={sender._id === ticket.sender._id ? "text-zinc-200" : "text-zinc-500"}>{new Intl.DateTimeFormat("fa", { dateStyle: "medium" }).format(Date.parse(createdAt))}</span>
          </div>
          <p className="my-2 text-lg" dangerouslySetInnerHTML={{ __html: body.replaceAll("\n", "<br />") }}></p>
          <span className={sender._id === ticket.sender._id ? "text-zinc-200" : "text-zinc-500"}>{new Intl.DateTimeFormat("fa", { hour: "2-digit", minute: "2-digit", hour12: true }).format(Date.parse(createdAt))}</span>
        </div>
      ))}
      {ticket?.isOpen && (
        <form className="mt-12 text-lg" onSubmit={submit}>
          <textarea
            type="text"
            value={body}
            placeholder="متن"
            className="mt-3 max-h-48 min-h-32 w-full rounded-3xl border border-zinc-200 p-4 text-lg outline-none placeholder:text-zinc-400"
            onInput={({ target }) => setBody(target.value)}
          />
          <button disabled={isPendingReplyTicket} className="mt-3 flex h-14 w-full items-center justify-center text-nowrap rounded-full bg-primary-900 text-white transition-colors enabled:hover:bg-primary-800">
            {isPendingReplyTicket ? <Loader width={"40px"} height={"10px"} color={"#ffffff"} /> : "ارسال"}
          </button>
        </form>
      )}
    </>
  );
};

export default Ticket;