import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useUser from "../../hooks/user/useUser";
import UserAvatar from "../../components/UserAvatar";
import Address from "../../components/admin/Address";
import AddressSkeleton from "../../components/admin/AddressSkeleton";
import Order from "../../components/admin/Order";
import OrderSkeleton from "../../components/admin/OrderSkeleton";
import Comment from "../../components/admin/Comment";
import CommentSkeleton from "../../components/admin/CommentSkeleton";
import Ticket from "../../components/admin/Ticket";
import TicketSkeleton from "../../components/admin/TicketSkeleton";
import NoResultFound from "../../components/NoResultFound";

const User = () => {
  const { id } = useParams();

  const { isFetchingUser, isUserError, user } = useUser(id);

  useEffect(() => {
    document.title = isFetchingUser || isUserError ? "تکنوشاپ - مدیریت" : `تکنوشاپ - مدیریت - کاربر ها - ${user.firstName} ${user.lastName}`;
  }, [isFetchingUser, isUserError, user]);

  useEffect(() => {
    if (isUserError) {
      throw Object.assign(new Error("کاربر مورد نظر پیدا نشد."), { status: 404 });
    }
  }, [isUserError]);

  return !isUserError && (
    <>
      <div className="flex flex-col gap-3 overflow-auto sm:flex-row sm:items-center">
        {isFetchingUser ? <div className="size-16 shrink-0 animate-pulse rounded-full bg-skeleton"></div> : <UserAvatar user={user} className="size-16 text-xl" />}
        <div className="flex flex-col gap-y-3 text-nowrap sm:gap-y-1">
          <div className="flex flex-col gap-3 text-lg sm:flex-row sm:items-center">
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">نام:</span>
              <span>{isFetchingUser ? "در حال بارگذاری" : user.firstName}</span>
            </div>
            <div className="hidden size-1.5 shrink-0 rounded-full bg-zinc-400 sm:block"></div>
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">نام خانوادگی:</span>
              <span>{isFetchingUser ? "در حال بارگذاری" : user.lastName}</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 text-lg sm:flex-row sm:items-center">
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">ایمیل:</span>
              <span>{isFetchingUser ? "در حال بارگذاری" : user.email}</span>
            </div>
            <div className="hidden size-1.5 shrink-0 rounded-full bg-zinc-400 sm:block"></div>
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">نقش:</span>
              <span>{isFetchingUser ? "در حال بارگذاری" : user.role === "ADMIN" ? "مدیر" : "کاربر"}</span>
            </div>
            <div className="hidden size-1.5 shrink-0 rounded-full bg-zinc-400 sm:block"></div>
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">وضعیت:</span>
              <span>{isFetchingUser ? "در حال بارگذاری" : user.isBanned ? "ممنوع" : "آزاد"}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-vazirmatn-bold text-xl">آدرس ها</h2>
        <span className="mr-auto text-zinc-500">{isFetchingUser ? 0 : user.addresses.length.toLocaleString()} آدرس</span>
      </div>
      {user?.addresses.length === 0 ? (
        <NoResultFound title="آدرسی پیدا نشد!" className="mt-4" />
      ) : (
        <div className="mt-4 overflow-auto rounded-3xl border border-zinc-200">
          <table className="w-full text-nowrap text-lg">
            <thead className="bg-zinc-200">
              <tr className="[&>*]:h-[72px] [&>*]:px-5 [&>*]:font-vazirmatn-medium [&>*]:font-normal">
                <th>استان</th>
                <th>شهر</th>
                <th>کدپستی</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {isFetchingUser ? Array(5).fill().map((address, index) => <AddressSkeleton key={index} />) : user.addresses.map((address) => <Address key={address._id} {...address} />)}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-vazirmatn-bold text-xl">سفارش ها</h2>
        <span className="mr-auto text-zinc-500">{isFetchingUser ? 0 : user.orders.length.toLocaleString()} سفارش</span>
      </div>
      {user?.orders.length === 0 ? (
        <NoResultFound title="سفارشی پیدا نشد!" className="mt-4" />
      ) : (
        <div className="mt-4 overflow-auto rounded-3xl border border-zinc-200">
          <table className="w-full text-nowrap text-lg">
            <thead className="bg-zinc-200">
              <tr className="[&>*]:h-[72px] [&>*]:px-5 [&>*]:font-vazirmatn-medium [&>*]:font-normal">
                <th>مبلغ کل</th>
                <th>تعداد محصولات</th>
                <th>وضعیت</th>
                <th>تاریخ ثبت</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {isFetchingUser ? Array(5).fill().map((order, index) => <OrderSkeleton key={index} />) : user.orders.map((order) => <Order key={order._id} {...order} />)}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-vazirmatn-bold text-xl">دیدگاه ها</h2>
        <span className="mr-auto text-zinc-500">{isFetchingUser ? 0 : user.comments.length.toLocaleString()} دیدگاه</span>
      </div>
      {user?.comments.length === 0 ? (
        <NoResultFound title="دیدگاهی پیدا نشد!" className="mt-4" />
      ) : (
        <div className="mt-4 overflow-auto rounded-3xl border border-zinc-200">
          <table className="w-full text-nowrap text-lg">
            <thead className="bg-zinc-200">
              <tr className="[&>*]:h-[72px] [&>*]:px-5 [&>*]:font-vazirmatn-medium [&>*]:font-normal">
                <th>امتیاز</th>
                <th>وضعیت</th>
                <th>محصول / مقاله</th>
                <th>تاریخ ثبت</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {isFetchingUser ? Array(5).fill().map((comment, index) => <CommentSkeleton key={index} />) : user.comments.map((comment) => <Comment key={comment._id} {...comment} />)}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-vazirmatn-bold text-xl">تیکت ها</h2>
        <span className="mr-auto text-zinc-500">{isFetchingUser ? 0 : user.tickets.length.toLocaleString()} تیکت</span>
      </div>
      {user?.tickets.length === 0 ? (
        <NoResultFound title="تیکتی پیدا نشد!" className="mt-4" />
      ) : (
        <div className="mt-4 overflow-auto rounded-3xl border border-zinc-200">
          <table className="w-full text-nowrap text-lg">
            <thead className="bg-zinc-200">
              <tr className="[&>*]:h-[72px] [&>*]:px-5 [&>*]:font-vazirmatn-medium [&>*]:font-normal">
                <th>عنوان</th>
                <th>دپارتمان</th>
                <th>وضعیت</th>
                <th>تاریخ ثبت</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {isFetchingUser ? Array(5).fill().map((ticket, index) => <TicketSkeleton key={index} />) : user.tickets.map((ticket) => <Ticket key={ticket._id} {...ticket} />)}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default User;