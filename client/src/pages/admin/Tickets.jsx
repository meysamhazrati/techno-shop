import { useEffect } from "react";
import useTickets from "../../hooks/ticket/useTickets";
import InfiniteScroll from "../../components/InfiniteScroll";
import Ticket from "../../components/admin/Ticket";
import TicketSkeleton from "../../components/admin/TicketSkeleton";
import NoResultFound from "../../components/NoResultFound";

const Tickets = () => {
  const { isFetchingTickets, isTicketsError, tickets, totalTickets, hasTicketsNextPage, fetchTicketsNextPage } = useTickets(20);

  useEffect(() => {
    document.title = "تکنوشاپ - مدیریت - تیکت ها";
  }, []);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-vazirmatn-bold text-xl">تیکت ها</h2>
        <span className="mr-auto text-zinc-500">{isFetchingTickets || isTicketsError ? 0 : totalTickets.toLocaleString()} تیکت</span>
      </div>
      {isTicketsError ? (
        <NoResultFound title="تیکتی پیدا نشد!" className="mt-6" />
      ) : (
        <div className="mt-6 overflow-auto rounded-3xl border border-zinc-200">
          <table className="w-full text-nowrap text-lg">
            <thead className="bg-zinc-200">
              <tr className="[&>*]:h-[72px] [&>*]:px-5 [&>*]:font-vazirmatn-medium [&>*]:font-normal">
                <th>عنوان</th>
                <th>دپارتمان</th>
                <th>وضعیت</th>
                <th>فرستنده</th>
                <th>تاریخ ثبت</th>
                <th></th>
              </tr>
            </thead>
            <InfiniteScroll hasNextPage={hasTicketsNextPage} fetchNextPage={fetchTicketsNextPage}>
              <tbody>
                {tickets?.map((ticket) => <Ticket key={ticket._id} {...ticket} />)}
                {isFetchingTickets && Array(20).fill().map((ticket, index) => <TicketSkeleton key={index} senderField={true} />)}
              </tbody>
            </InfiniteScroll>
          </table>
        </div>
      )}
    </>
  );
};

export default Tickets;