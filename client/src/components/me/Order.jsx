import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import TomanIcon from "../../icons/Toman";
import "swiper/css";
import "swiper/css/free-mode";

const Order = ({ _id, totalAmount, status, products, createdAt }) => {
  return (
    <Link to={`orders/${_id}`} className="block py-4 text-lg first:pt-0 last:pb-0">
      <div className="grid w-full grid-cols-1 items-center gap-2 overflow-auto text-nowrap sm:grid-cols-2 xl:flex xl:justify-between">
        <div className="flex items-center gap-x-2">
          <span className="text-zinc-400">مبلغ کل:</span>
          <span className="flex items-center gap-x-1">
            {totalAmount.toLocaleString()}
            <TomanIcon className="size-5" />
          </span>
        </div>
        <div className="flex items-center gap-x-2">
          <span className="text-zinc-400">تعداد کالاها:</span>
          <span>{products.reduce((previous, { quantity }) => previous + quantity, 0).toLocaleString()} کالا</span>
        </div>
        <div className="flex items-center gap-x-2">
          <span className="text-zinc-400">وضعیت:</span>
          <span>{status === "Delivered" ? "تحویل داده شده" : status === "Canceled" ? "لغو شده" : status === "Returned" ? "برگشت داده شده" : "جاری"}</span>
        </div>
        <div className="flex items-center gap-x-2">
          <span className="text-zinc-400">تاریخ ثبت:</span>
          <span>{new Intl.DateTimeFormat("fa", { dateStyle: "medium" }).format(Date.parse(createdAt),)}</span>
        </div>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={16}
        freeMode={true}
        breakpoints={{
          310: { slidesPerView: 1.5 },
          480: { slidesPerView: 2.5 },
          640: { slidesPerView: 3.5 },
          1280: { slidesPerView: 4.5 },
        }}
        modules={[FreeMode]}
        className="mt-4"
      >
        {products.map(({ _id, quantity, product }) => (
          <SwiperSlide key={_id} className="relative">
            <div className="absolute right-2 top-2 z-50 flex size-8 items-center justify-center rounded-full border border-zinc-900 bg-white">{quantity}</div>
            <img src={`${process.env.SERVER_URI}/products/${product.covers[0]}`} alt="Product Cover" loading="lazy" className="h-28 w-full rounded-3xl object-cover" />
            <h4 className="mt-2 line-clamp-1 font-vazirmatn-medium">{product.title}</h4>
          </SwiperSlide>
        ))}
      </Swiper>
    </Link>
  );
};

export default Order;