import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import ProductCover from "../ProductCover";
import ChevronIcon from "../../icons/ChevronIcon";
import TomanIcon from "../../icons/TomanIcon";
import "swiper/css";
import "swiper/css/free-mode";

const Order = ({ _id, totalPrice, status, products, createdAt }) => {
  return (
    <div className="block py-4 text-lg first:pt-0 last:pb-0">
      <div className="flex items-center justify-between gap-x-10 overflow-auto">
        <div className="grid shrink-0 grid-cols-1 items-center gap-2 text-nowrap sm:w-full sm:shrink sm:grid-cols-2 xl:flex xl:justify-between">
          <div className="flex items-center gap-x-2">
            <span className="text-zinc-400">مبلغ کل:</span>
            <span className="flex items-center gap-x-1 font-vazirmatn-bold">
              {totalPrice.toLocaleString()}
              <TomanIcon className="size-5" />
            </span>
          </div>
          <div className="flex items-center gap-x-2">
            <span className="text-zinc-400">تعداد محصولات:</span>
            <span>{products.reduce((previous, { quantity }) => previous + quantity, 0).toLocaleString()} محصول</span>
          </div>
          <div className="flex items-center gap-x-2">
            <span className="text-zinc-400">وضعیت:</span>
            <span>{status}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <span className="text-zinc-400">تاریخ ثبت:</span>
            <span>{new Intl.DateTimeFormat("fa", { dateStyle: "medium" }).format(Date.parse(createdAt))}</span>
          </div>
        </div>
        <Link to={`/me/orders/${_id}`} className="flex size-11 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-zinc-200 hover:text-zinc-700">
          <ChevronIcon className="size-6 rotate-180" />
        </Link>
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
        className="mt-2"
      >
        {products.map(({ _id, quantity, product }) => (
          <SwiperSlide key={_id} className="relative">
            <div className="h-28 w-full overflow-hidden rounded-3xl">
              <ProductCover id={product._id} covers={product.covers} />
              <div className="absolute right-2 top-2 z-50 flex size-8 items-center justify-center rounded-full border border-zinc-900 bg-white">{quantity.toLocaleString()}</div>
            </div>
            <h4 className="mt-2 font-vazirmatn-medium">
              <Link to={`/products/${product._id}`} className="line-clamp-1 transition-colors hover:text-primary-900">{product.title}</Link>
            </h4>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Order;