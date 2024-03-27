import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import useProducts from "../../hooks/product/products";
import Product from "./Product";
import ProductSkeleton from "./ProductSkeleton";
import NoProductFound from "../NoProductFound";
import ChevronRightIcon from "../../icons/ChevronRight";
import ChevronLeftIcon from "../../icons/ChevronLeft";
import "swiper/css";

const BestSellers = () => {
  const { isFetchingProducts, isProductsError, products } = useProducts("best-sellers", 10);

  return (
    <section className="mt-12">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-vazirmatn-bold text-3xl">پرفروش‌ترین ها</h2>
        {products?.length > 4 && (
          <div className="mr-auto flex items-center gap-x-3 text-primary-900">
            <button className="swiper-button-prev flex size-12 items-center justify-center rounded-full border border-primary-900 transition-colors hover:bg-primary-50">
              <ChevronRightIcon className="size-6" />
            </button>
            <button className="swiper-button-next flex size-12 items-center justify-center rounded-full border border-primary-900 transition-colors hover:bg-primary-50">
              <ChevronLeftIcon className="size-6" />
            </button>
          </div>
        )}
      </div>
      {isProductsError ? (
        <NoProductFound />
      ) : (
        <Swiper
          slidesPerView={1}
          spaceBetween={16}
          loop={true}
          autoplay={{ delay: 2000 }}
          navigation={{ prevEl: ".swiper-button-prev", nextEl: ".swiper-button-next" }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          modules={[Autoplay, Navigation]}
          className="mt-10"
        >
          {isFetchingProducts ? Array(5).fill(0).map((product, index) => (
            <SwiperSlide key={index}>
              <ProductSkeleton />
            </SwiperSlide>
          )) : products?.map((product) => (
            <SwiperSlide key={product._id}>
              <Product {...product} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};

export default BestSellers;