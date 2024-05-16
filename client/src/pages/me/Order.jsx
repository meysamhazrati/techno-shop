import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useMe from "../../hooks/authentication/me";
import ProductCover from "../../components/ProductCover";
import TomanIcon from "../../icons/Toman";

const Order = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const { me } = useMe();

  useEffect(() => {
    document.title = `تکنوشاپ - من - ${id}`;
  }, [id]);

  useEffect(() => {
    if (me.orders.some(({ _id }) => id === _id)) {
      setOrder(me.orders.find(({ _id }) => id === _id));
    } else {
      throw Object.assign(new Error("The order was not found."), { status: 404 });
    }
  }, [id, me]);

  return (
    <>
      <div className="flex flex-col gap-3 overflow-auto text-nowrap text-lg sm:flex-row sm:items-center">
        <div className="flex items-center gap-x-2">
          <span className="text-zinc-400">مبلغ کل:</span>
          <span className="flex items-center gap-x-1 font-vazirmatn-bold">
            {order.totalPrice?.toLocaleString()}
            <TomanIcon className="size-5" />
          </span>
        </div>
        <div className="hidden size-1.5 shrink-0 rounded-full bg-zinc-400 sm:block"></div>
        <div className="flex items-center gap-x-2">
          <span className="text-zinc-400">تعداد محصولات:</span>
          <span>{order.products?.reduce((previous, { quantity }) => previous + quantity, 0).toLocaleString()} محصول</span>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-3 overflow-auto text-nowrap border-t border-zinc-200 pt-6 text-lg sm:flex-row sm:items-center">
        <div className="flex items-center gap-x-2">
          <span className="text-zinc-400">وضعیت:</span>
          <span>{order.status === "Delivered" ? "تحویل شده" : order.status === "Canceled" ? "لغو شده" : order.status === "Returned" ? "مرجوع شده" : "جاری"}</span>
        </div>
        <div className="hidden size-1.5 shrink-0 rounded-full bg-zinc-400 sm:block"></div>
        <div className="flex items-center gap-x-2">
          <span className="text-zinc-400">تاریخ ثبت:</span>
          {order.createdAt && <span>{new Intl.DateTimeFormat("fa", { dateStyle: "medium" }).format(Date.parse(order.createdAt))}</span>}
        </div>
        {order.status && order.status !== "In progress" && (
          <>
            <div className="hidden size-1.5 shrink-0 rounded-full bg-zinc-400 sm:block"></div>
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">تاریخ {order.status === "Delivered"? "تحویل": order.status === "Canceled"? "لغو": "مرجوع"}:</span>
              {order.updatedAt && <span>{new Intl.DateTimeFormat("fa", { dateStyle: "medium" }).format(Date.parse(order.updatedAt))}</span>}
            </div>
          </>
        )}
      </div>
      <div className="mt-6 overflow-auto text-nowrap border-t border-zinc-200 pt-6 text-lg">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-x-2">
            <span className="text-zinc-400">استان:</span>
            <span>{order.destination?.province}</span>
          </div>
          <div className="hidden size-1.5 shrink-0 rounded-full bg-zinc-400 sm:block"></div>
          <div className="flex items-center gap-x-2">
            <span className="text-zinc-400">شهر:</span>
            <span>{order.destination?.city}</span>
          </div>
          <div className="hidden size-1.5 shrink-0 rounded-full bg-zinc-400 sm:block"></div>
          <div className="flex items-center gap-x-2">
            <span className="text-zinc-400">کدپستی:</span>
            <span>{order.destination?.postalCode}</span>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-x-2">
          <span className="text-zinc-400">آدرس:</span>
          <p>{order.destination?.body}</p>
        </div>
      </div>
      <div className="mt-6 divide-y divide-zinc-200 overflow-auto border-t border-zinc-200 pt-6 text-lg">
        {order.products?.map(({ _id, quantity, product, color }) => (
          <div key={_id} className="grid grid-cols-[150px_1fr] items-center gap-x-3 py-3 first:pt-0 last:pb-0">
            <div className="h-28 w-full">
              <ProductCover id={product._id} covers={product.covers} />
            </div>
            <div>
              <h3 className="font-vazirmatn-medium">
                <Link to={`/products/${product._id}`} className="line-clamp-1 transition-colors hover:text-primary-900">{product.title}</Link>
              </h3>
              <div className="mt-3 flex flex-col gap-3 text-nowrap sm:flex-row sm:items-center">
                <div className="flex items-center gap-x-2">
                  <span className="text-zinc-400">تعداد:</span>
                  <span>{quantity.toLocaleString()} عدد</span>
                </div>
                <div className="hidden size-1.5 shrink-0 rounded-full bg-zinc-400 sm:block"></div>
                <div className="flex items-center gap-x-2">
                  <span className="text-zinc-400">رنگ:</span>
                  <span>{color.name}</span>
                </div>
                <div className="hidden size-1.5 shrink-0 rounded-full bg-zinc-400 sm:block"></div>
                <div className="flex items-center gap-x-2">
                  <span className="text-zinc-400">گارانتی:</span>
                  <span>{product.warranty} ماه</span>
                </div>
              </div>
              <span className="mt-3 flex items-center gap-x-1 font-vazirmatn-bold">
                {color.price.toLocaleString()}
                <TomanIcon className="size-5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Order;