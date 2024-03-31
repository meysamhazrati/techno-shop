import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import useProducts from "../../hooks/product/products";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import Product from "./Product";
import ProductSkeleton from "./ProductSkeleton";
import NoResultFound from "../NoResultFound";
import "swiper/css";

const BestSellers = () => {
  const { isFetchingProducts, isProductsError, products } = useProducts(null, null, null, null, null, null, "best-seller", 10);

  return (
    <Section>
      <SectionHeader title="پرفروش‌ترین ها" condition={products?.length > 4} navigation={true} />
      {isProductsError ? (
        <NoResultFound title="محصولی پیدا نشد!" />
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
          className="mt-8"
        >
          {isFetchingProducts ? Array(5).fill(0).map((product, index) => (
            <SwiperSlide key={index}>
              <ProductSkeleton />
            </SwiperSlide>
          )) : products.map((product) => (
            <SwiperSlide key={product._id}>
              <Product {...product} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Section>
  );
};

export default BestSellers;