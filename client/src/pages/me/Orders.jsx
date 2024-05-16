import { useEffect } from "react";
import useMe from "../../hooks/authentication/me";
import Order from "../../components/me/Order";
import NoResultFound from "../../components/NoResultFound";

const Orders = () => {
  const { me } = useMe();

  useEffect(() => {
    document.title = "تکنوشاپ - من - سفارش ها";
  }, []);

  return me.orders.length !== 0 ? (
    <div className="divide-y divide-zinc-200 overflow-hidden">
      {me.orders.map((order) => <Order key={order._id} {...order} />)}
    </div>
  ) : (
    <NoResultFound title="سفارشی پیدا نشد!" />
  );
};

export default Orders;