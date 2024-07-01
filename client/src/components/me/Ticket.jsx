import { Link } from "react-router-dom";
import ChevronIcon from "../../icons/ChevronIcon";

const Ticket = ({ _id, title, department, body, isOpen, createdAt }) => {
  return (
    <div className="py-4 text-lg first:pt-0 last:pb-0">
      <div className="flex items-center justify-between gap-x-10 overflow-auto">
        <div className="grid shrink-0 grid-cols-1 items-center gap-2 text-nowrap sm:w-full sm:shrink sm:grid-cols-2 xl:flex xl:justify-between">
          <div className="flex items-center gap-x-2">
            <span className="text-zinc-400">عنوان:</span>
            <span>{title}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <span className="text-zinc-400">دپارتمان:</span>
            <span>{department}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <span className="text-zinc-400">وضعیت:</span>
            <span>{isOpen ? "باز" : "بسته شده"}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <span className="text-zinc-400">تاریخ ثبت:</span>
            <span>{new Intl.DateTimeFormat("fa", { dateStyle: "medium" }).format(Date.parse(createdAt))}</span>
          </div>
        </div>
        <Link to={`/me/tickets/${_id}`} className="flex size-11 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-zinc-200 hover:text-zinc-700">
          <ChevronIcon className="size-6 rotate-180" />
        </Link>
      </div>
      <p className="mt-2" dangerouslySetInnerHTML={{ __html: body.replaceAll("\n", "<br />") }}></p>
    </div>
  );
};

export default Ticket;