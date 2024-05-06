import { useEffect } from "react";
import { Link } from "react-router-dom";
import useMe from "../../hooks/authentication/me";
import Order from "../../components/me/Order";
import Comment from "../../components/me/Comment";
import ChevronIcon from "../../icons/Chevron";
import BagIcon from "../../icons/Bag";
import BookIcon from "../../icons/Book";
import CommentIcon from "../../icons/Comment";
import TicketIcon from "../../icons/Ticket";

const Dashboard = () => {
  const { me } = useMe();

  useEffect(() => {
    document.title = "تکنوشاپ - من";
  }, []);

  return (
    <>
      <div className="grid items-center gap-3 text-white xs:grid-cols-2 xl:grid-cols-4">
        <div className="flex items-center gap-x-2 overflow-hidden rounded-full bg-primary-900 p-2">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary-800">
            <BagIcon className="size-8" />
          </div>
          <div className="overflow-hidden">
            <span className="text-nowrap">سفارش‌های من</span>
            <h6 className="mt-0.5 line-clamp-1 font-vazirmatn-medium text-xl">{me.orders.length.toLocaleString()} سفارش</h6>
          </div>
        </div>
        <div className="flex items-center gap-x-2 rounded-full bg-primary-900 p-2">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary-800">
            <BookIcon className="size-8" />
          </div>
          <div className="overflow-hidden">
            <span className="text-nowrap">مقاله‌های من</span>
            <h6 className="mt-0.5 line-clamp-1 font-vazirmatn-medium text-xl">{me.orders.length.toLocaleString()} مقاله</h6>
          </div>
        </div>
        <div className="flex items-center gap-x-2 rounded-full bg-primary-900 p-2">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary-800">
            <CommentIcon className="size-8" />
          </div>
          <div className="overflow-hidden">
            <span className="text-nowrap">دیدگاه‌های من</span>
            <h6 className="mt-0.5 line-clamp-1 font-vazirmatn-medium text-xl">{me.orders.length.toLocaleString()} دیدگاه</h6>
          </div>
        </div>
        <div className="flex items-center gap-x-2 rounded-full bg-primary-900 p-2">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary-800">
            <TicketIcon className="size-8" />
          </div>
          <div className="overflow-hidden">
            <span className="text-nowrap">تیکت‌های من</span>
            <h6 className="mt-0.5 line-clamp-1 font-vazirmatn-medium text-xl">{me.orders.length.toLocaleString()} تیکت</h6>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-vazirmatn-medium text-2xl">سفارش‌های اخیر</h3>
          <Link to="orders" className="mr-auto flex h-11 w-36 items-center justify-center gap-x-1 rounded-full text-primary-900 transition-colors hover:bg-primary-50">
            <span>همه سفارش‌ها</span>
            <ChevronIcon className="size-[17px] rotate-180" />
          </Link>
        </div>
        <div className="mt-6 divide-y divide-zinc-200 overflow-hidden">
          {me.orders.slice(0, 3).map((order) => <Order key={order._id} {...order} />)}
        </div>
      </div>
      <div className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-vazirmatn-medium text-2xl">دیدگاه‌های اخیر</h3>
          <Link to="comments" className="mr-auto flex h-11 w-36 items-center justify-center gap-x-1 rounded-full text-primary-900 transition-colors hover:bg-primary-50">
            <span>همه دیدگاه‌ها</span>
            <ChevronIcon className="size-[17px] rotate-180" />
          </Link>
        </div>
        <div className="mt-6 divide-y divide-zinc-200 overflow-hidden">
          {me.comments.slice(0, 3).map((comment) => <Comment key={comment._id} {...comment} />)}
        </div>
      </div>
    </>
  );
};

export default Dashboard;