import { useEffect } from "react";
import useOrders from "../../hooks/order/useOrders";
import InfiniteScroll from "../../components/InfiniteScroll";
import Order from "../../components/admin/Order";
import OrderSkeleton from "../../components/admin/OrderSkeleton";
import NoResultFound from "../../components/NoResultFound";

const Orders = () => {
  const { isFetchingOrders, isOrdersError, orders, total, hasOrdersNextPage, fetchOrdersNextPage } = useOrders(20);

  useEffect(() => {
    document.title = "تکنوشاپ - مدیریت - سفارش ها";
  }, []);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-vazirmatn-bold text-xl">سفارش ها</h2>
        <span className="mr-auto text-zinc-500">{isFetchingOrders || isOrdersError ? 0 : total.toLocaleString()} سفارش</span>
      </div>
      {isOrdersError ? (
        <NoResultFound title="سفارشی پیدا نشد!" className="mt-6" />
      ) : (
        <div className="mt-6 overflow-auto rounded-3xl border border-zinc-200">
          <table className="w-full text-nowrap text-lg">
            <thead className="bg-zinc-200">
              <tr className="[&>*]:h-[72px] [&>*]:px-5 [&>*]:font-vazirmatn-medium [&>*]:font-normal">
                <th>مبلغ کل</th>
                <th>تعداد محصولات</th>
                <th>وضعیت</th>
                <th>خریدار</th>
                <th>تاریخ ثبت</th>
                <th></th>
              </tr>
            </thead>
            <InfiniteScroll hasNextPage={hasOrdersNextPage} fetchNextPage={fetchOrdersNextPage}>
              <tbody>
                {orders?.map((order) => <Order key={order._id} {...order} />)}
                {isFetchingOrders && Array(20).fill().map((order, index) => <OrderSkeleton key={index} buyerField={true} />)}
              </tbody>
            </InfiniteScroll>
          </table>
        </div>
      )}
    </>
  );
};

export default Orders;