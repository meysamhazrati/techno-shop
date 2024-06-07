import { useEffect } from "react";
import useMe from "../../hooks/authentication/useMe";
import Order from "../../components/me/Order";
import NoResultFound from "../../components/NoResultFound";

const Orders = () => {
  const { me } = useMe();

  useEffect(() => {
    document.title = "تکنوشاپ - من - سفارش ها";
  }, []);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-vazirmatn-bold text-xl">سفارش ها</h2>
        <span className="mr-auto text-zinc-500">{me.orders.length.toLocaleString()} سفارش</span>
      </div>
      {me.orders.length !== 0 ? (
        <div className="mt-4 divide-y divide-zinc-200 overflow-hidden">
          {me.orders.map((order) => <Order key={order._id} {...order} />)}
        </div>
      ) :(
        <NoResultFound title="سفارشی پیدا نشد!" className="mt-4" />
      )}
    </>
  );
};

export default Orders;