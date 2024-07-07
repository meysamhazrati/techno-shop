import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useOrder from "../../hooks/order/useOrder";
import OrderProduct from "../../components/admin/OrderProduct";
import OrderProductSkeleton from "../../components/admin/OrderProductSkeleton";

const Order = () => {
  const { id } = useParams();

  const { isFetchingOrder, isOrderError, order } = useOrder(id);

  useEffect(() => {
    document.title = isFetchingOrder || isOrderError ? "تکنوشاپ - مدیریت" : `تکنوشاپ - مدیریت - ${order._id}`;
  }, [isFetchingOrder, isOrderError, order]);

  return (
    !isOrderError && (
      <>
        <div className="flex flex-col gap-3 overflow-auto text-nowrap text-lg sm:flex-row sm:items-center">
          <div className="flex items-center gap-x-2">
            <span className="text-zinc-400">مبلغ کل:</span>
            <span>{isFetchingOrder ? "در حال بارگذاری" : `${order.totalPrice.toLocaleString()} تومان`}</span>
          </div>
          <div className="hidden size-1.5 shrink-0 rounded-full bg-zinc-400 sm:block"></div>
          <div className="flex items-center gap-x-2">
            <span className="text-zinc-400">تعداد محصولات:</span>
            <span>{isFetchingOrder ? "در حال بارگذاری" : `${order.products.reduce((previous, { quantity }) => previous + quantity, 0).toLocaleString()} محصول`}</span>
          </div>
        </div>
        {order?.discountCode && (
          <div className="mt-3 flex flex-col gap-3 overflow-auto text-nowrap text-lg sm:flex-row sm:items-center">
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">کد تخفیف:</span>
              <span>{order.discountCode.code}</span>
            </div>
            <div className="hidden size-1.5 shrink-0 rounded-full bg-zinc-400 sm:block"></div>
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">درصد تخفیف:</span>
              <span>{order.discountCode.percent} درصد</span>
            </div>
          </div>
        )}
        <div className="mt-3 flex flex-col gap-3 overflow-auto text-nowrap text-lg sm:flex-row sm:items-center">
          <div className="flex items-center gap-x-2">
            <span className="text-zinc-400">وضعیت:</span>
            <span>{isFetchingOrder ? "در حال بارگذاری" : order.status}</span>
          </div>
          <div className="hidden size-1.5 shrink-0 rounded-full bg-zinc-400 sm:block"></div>
          <div className="flex items-center gap-x-2">
            <span className="text-zinc-400">تاریخ ثبت:</span>
            <span>{isFetchingOrder ? "در حال بارگذاری" : new Intl.DateTimeFormat("fa", { dateStyle: "medium" }).format(Date.parse(order.createdAt))}</span>
          </div>
          {!isFetchingOrder && order.status !== "جاری" && (
            <>
              <div className="hidden size-1.5 shrink-0 rounded-full bg-zinc-400 sm:block"></div>
              <div className="flex items-center gap-x-2">
                <span className="text-zinc-400">تاریخ {order.status === "تحویل شده" ? "تحویل" : order.status === "لغو شده" ? "لغو" : "مرجوع"}:</span>
                <span>{new Intl.DateTimeFormat("fa", { dateStyle: "medium" }).format(Date.parse(order.updatedAt))}</span>
              </div>
            </>
          )}
        </div>
        <div className="mt-3 overflow-auto text-nowrap text-lg">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">استان:</span>
              <span>{isFetchingOrder ? "در حال بارگذاری" : order.destination.province}</span>
            </div>
            <div className="hidden size-1.5 shrink-0 rounded-full bg-zinc-400 sm:block"></div>
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">شهر:</span>
              <span>{isFetchingOrder ? "در حال بارگذاری" : order.destination.city}</span>
            </div>
            <div className="hidden size-1.5 shrink-0 rounded-full bg-zinc-400 sm:block"></div>
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">کدپستی:</span>
              <span>{isFetchingOrder ? "در حال بارگذاری" : order.destination.postalCode}</span>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-x-2">
            <span className="text-zinc-400">آدرس:</span>
            <p>{isFetchingOrder ? "در حال بارگذاری" : order.destination.body}</p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-vazirmatn-bold text-xl">محصول ها</h2>
          <span className="mr-auto text-zinc-500">{isFetchingOrder ? 0 : order.products.length.toLocaleString()} محصول</span>
        </div>
        <div className="mt-4 overflow-auto rounded-3xl border border-zinc-200">
          <table className="w-full text-nowrap text-lg">
            <thead className="bg-zinc-200">
              <tr className="[&>*]:h-[72px] [&>*]:px-5 [&>*]:font-vazirmatn-medium [&>*]:font-normal">
                <th>کاور</th>
                <th>عنوان</th>
                <th>تعداد</th>
                <th>رنگ</th>
                <th>گارانتی</th>
                <th>برند</th>
                <th>دسته‌بندی‌</th>
                <th>پیشنهاد</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{isFetchingOrder ? Array(5).fill().map((product, index) => <OrderProductSkeleton key={index} />) : order.products.map((product) => <OrderProduct key={product._id} {...product} />)}</tbody>
          </table>
        </div>
      </>
    )
  );
};

export default Order;