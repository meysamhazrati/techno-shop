import { useEffect } from "react";
import { Link } from "react-router-dom";
import useMe from "../../hooks/authentication/me";
import Order from "../../components/me/Order";
import Comment from "../../components/me/Comment";
import Ticket from "../../components/me/Ticket";
import NoResultFound from "../../components/NoResultFound";
import ChevronIcon from "../../icons/Chevron";
import BagIcon from "../../icons/Bag";
import CommentIcon from "../../icons/Comment";
import TicketIcon from "../../icons/Ticket";

const Dashboard = () => {
  const { me } = useMe();

  useEffect(() => {
    document.title = "تکنوشاپ - من";
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 items-center gap-3 text-white sm:grid-cols-3">
        <div className="flex items-center gap-x-2 overflow-hidden rounded-full bg-primary-900 p-2">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary-800">
            <BagIcon className="size-8" />
          </div>
          <div className="overflow-hidden">
            <span className="text-nowrap">سفارش‌های من</span>
            <h6 className="mt-0.5 line-clamp-1 font-vazirmatn-medium text-lg">{me.orders.length.toLocaleString()} سفارش</h6>
          </div>
        </div>
        <div className="flex items-center gap-x-2 rounded-full bg-primary-900 p-2">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary-800">
            <CommentIcon className="size-8" />
          </div>
          <div className="overflow-hidden">
            <span className="text-nowrap">دیدگاه‌های من</span>
            <h6 className="mt-0.5 line-clamp-1 font-vazirmatn-medium text-lg">{me.orders.length.toLocaleString()} دیدگاه</h6>
          </div>
        </div>
        <div className="flex items-center gap-x-2 rounded-full bg-primary-900 p-2">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary-800">
            <TicketIcon className="size-8" />
          </div>
          <div className="overflow-hidden">
            <span className="text-nowrap">تیکت‌های من</span>
            <h6 className="mt-0.5 line-clamp-1 font-vazirmatn-medium text-lg">{me.orders.length.toLocaleString()} تیکت</h6>
          </div>
        </div>
      </div>
      {(me.orders.length !== 0 || me.comments.length !== 0 || me.tickets.length !== 0) ? (
        <>
          {me.orders.length !== 0 && (
            <div className="mt-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-vazirmatn-bold text-xl">سفارش‌های اخیر</h3>
                <Link to="orders" className="mr-auto flex h-11 w-36 items-center justify-center gap-x-1 rounded-full text-primary-900 transition-colors hover:bg-primary-50">
                  <span>همه سفارش‌ها</span>
                  <ChevronIcon className="size-[17px] rotate-180" />
                </Link>
              </div>
              <div className="mt-4 divide-y divide-zinc-200 overflow-hidden">
                {me.orders.slice(0, 3).map((order) => <Order key={order._id} {...order} />)}
              </div>
            </div>
          )}
          {me.comments.length !== 0 && (
            <div className="mt-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-vazirmatn-bold text-xl">دیدگاه‌های اخیر</h3>
                <Link to="comments" className="mr-auto flex h-11 w-36 items-center justify-center gap-x-1 rounded-full text-primary-900 transition-colors hover:bg-primary-50">
                  <span>همه دیدگاه‌ها</span>
                  <ChevronIcon className="size-[17px] rotate-180" />
                </Link>
              </div>
              <div className="mt-4 divide-y divide-zinc-200 overflow-hidden">
                {me.comments.slice(0, 3).map((comment) => <Comment key={comment._id} {...comment} />)}
              </div>
            </div>
          )}
          {me.tickets.length !== 0 && (
            <div className="mt-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-vazirmatn-bold text-xl">تیکت‌های اخیر</h3>
                <Link to="tickets" className="mr-auto flex h-11 w-36 items-center justify-center gap-x-1 rounded-full text-primary-900 transition-colors hover:bg-primary-50">
                  <span>همه تیکت‌ها</span>
                  <ChevronIcon className="size-[17px] rotate-180" />
                </Link>
              </div>
              <div className="mt-4 divide-y divide-zinc-200 overflow-hidden">
                {me.tickets.slice(0, 3).map((ticket) => <Ticket key={ticket._id} {...ticket} />)}
              </div>
            </div>
          )}
        </>
      ) : (
        <NoResultFound title="اخیرا فعالیتی نداشته‌اید!" className="mt-6" />
      )}
    </>
  );
};

export default Dashboard;