import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import useCategory from "../../hooks/category/useCategory";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import Product from "./Product";
import ProductSkeleton from "./ProductSkeleton";
import NoResultFound from "../NoResultFound";
import "swiper/css";

const RelatedProducts = ({ categoryTitle }) => {
  const { isFetchingCategory, isCategoryError, category } = useCategory(categoryTitle.toLowerCase().split(" ").join("-"), null, null, null, null, null, 10);

  return !isCategoryError && (
    <Section>
      <SectionHeader title="محصولات مرتبط" condition={category?.products.length > 4} navigation={true} />
      {category?.products.length === 0 ? (
        <NoResultFound title="محصول مرتبطی پیدا نشد!" className="mt-8" />
      ) : (
        <Swiper
          slidesPerView={1}
          spaceBetween={16}
          loop={true}
          autoplay={{ delay: 2000 }}
          navigation={{ prevEl: ".swiper-button-prev", nextEl: ".swiper-button-next"}}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          modules={[Autoplay, Navigation]}
          className="mt-8"
        >
          {isFetchingCategory ? Array(5).fill(0).map((product, index) => (
            <SwiperSlide key={index}>
              <ProductSkeleton />
            </SwiperSlide>
          )) : category.products.map((product) => (
            <SwiperSlide key={product._id}>
              <Product {...product} category={category} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Section>
  );
};

export default RelatedProducts;