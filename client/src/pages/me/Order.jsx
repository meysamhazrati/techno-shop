import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import useOrder from "../../hooks/order/useOrder";
import useCancelOrder from "../../hooks/order/useCancelOrder";
import useReturnOrder from "../../hooks/order/useReturnOrder";
import ProductCover from "../../components/ProductCover";
import Modal from "../../components/Modal";
import Confirm from "../../components/Confirm";
import TomanIcon from "../../icons/TomanIcon";

const Order = () => {
  const { id } = useParams();

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);

  const client = useQueryClient();

  const { isFetchingOrder, isOrderError, order } = useOrder(id);
  const { isPendingCancelOrder, cancelOrder } = useCancelOrder(id);
  const { isPendingReturnOrder, returnOrder } = useReturnOrder(id);

  useEffect(() => {
    document.title = isOrderError || isFetchingOrder ? "تکنوشاپ - من" : `تکنوشاپ - من - سفارش ها - ${order._id}`;
  }, [isOrderError, isFetchingOrder, order]);

  useEffect(() => {
    if (isOrderError) {
      throw Object.assign(new Error("سفارش مورد نظر پیدا نشد."), { status: 404 });
    }
  }, [isOrderError]);

  return !isOrderError && (
    <>
      <div className="flex flex-col gap-3 overflow-auto text-nowrap text-lg sm:flex-row sm:items-center">
        <div className="flex items-center gap-x-2">
          <span className="text-zinc-400">مبلغ کل:</span>
          <span className="flex items-center gap-x-1 font-vazirmatn-bold">
            {isFetchingOrder ? (
              "در حال بارگذاری"
            ) : (
              <>
                {order.totalPrice.toLocaleString()}
                <TomanIcon className="size-5" />
              </>
            )}
          </span>
        </div>
        <div className="hidden size-1.5 shrink-0 rounded-full bg-zinc-400 sm:block"></div>
        <div className="flex items-center gap-x-2">
          <span className="text-zinc-400">تعداد محصولات:</span>
          <span>{isFetchingOrder ? "در حال بارگذاری" : `${order.products.reduce((previous, { quantity }) => previous + quantity, 0).toLocaleString()} محصول`}</span>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-3 overflow-auto text-nowrap border-t border-zinc-200 pt-6 text-lg sm:flex-row sm:items-center">
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
      <div className="mt-6 overflow-auto text-nowrap border-t border-zinc-200 pt-6 text-lg">
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
      <div className="mt-6 divide-y divide-zinc-200 overflow-auto border-t border-zinc-200 pt-6 text-lg">
        {order?.products.map(({ _id, quantity, product, color }) => (
          <div key={_id} className="grid grid-cols-[150px_1fr] items-center gap-x-3 py-3 first:pt-0 last:pb-0">
            <div className="h-28 w-full">
              <ProductCover {...product} />
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
                  <span>{product.warranty > 0 ? `${product.warranty} ماه` : "ندارد"}</span>
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
      {!isFetchingOrder && order.status !== "لغو شده" && order.status !== "مرجوع شده" && (
        <div className="mt-6 flex items-center gap-x-3 text-lg">
          {order.status === "جاری" && <button className="flex h-14 w-full items-center justify-center rounded-full bg-red-500 text-white sm:w-40" onClick={() => setIsCancelModalOpen(true)}>لغو</button>}
          {order.status === "تحویل شده" && <button className="flex h-14 w-full items-center justify-center rounded-full bg-zinc-200 text-zinc-700 sm:w-40" onClick={() => setIsReturnModalOpen(true)}>مرجوع</button>}
        </div>
      )}
      <Modal isOpen={isCancelModalOpen} onClose={() => setIsCancelModalOpen(false)}>
        <Confirm title="این سفارش را لغو می‌کنید؟" isPending={isPendingCancelOrder} onCancel={() => setIsCancelModalOpen(false)} onConfirm={() => cancelOrder(null, { onSuccess: () => {
          client.invalidateQueries({ queryKey: ["orders", { id }] });
          setIsCancelModalOpen(false);
        } })} />
      </Modal>
      <Modal isOpen={isReturnModalOpen} onClose={() => setIsReturnModalOpen(false)}>
        <Confirm title="این سفارش را مرجوع می‌کنید؟" isPending={isPendingReturnOrder} onCancel={() => setIsReturnModalOpen(false)} onConfirm={() => returnOrder(null, { onSuccess: () => {
          client.invalidateQueries({ queryKey: ["orders", { id }] });
          setIsReturnModalOpen(false);
        } })} />
      </Modal>
    </>
  );
};

export default Order;