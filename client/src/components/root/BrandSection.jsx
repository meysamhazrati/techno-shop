import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import useBrand from "../../hooks/brand/useBrand";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import Product from "./Product";
import ProductSkeleton from "./ProductSkeleton";
import NoResultFound from "../NoResultFound";

const BrandSection = ({ name, englishName }) => {
  const { isFetchingBrand, isBrandError, brand } = useBrand(englishName.toLowerCase().split(" ").join("-"), null, null, null, null, null, 10);

  return !isBrandError && (
    <Section>
      <SectionHeader title={name} condition={brand?.products.length > 4} button={true} route={`/brands/${englishName.toLowerCase().split(" ").join("-")}`} />
      {brand?.products.length === 0 ? (
        <NoResultFound title="محصولی پیدا نشد!" className="mt-8" />
      ) : (
        <Swiper
          slidesPerView={1}
          spaceBetween={16}
          loop={true}
          autoplay={{ delay: 2000 }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          modules={[Autoplay]}
          className="mt-8"
        >
          {isFetchingBrand ? Array(5).fill(0).map((product, index) => (
            <SwiperSlide key={index}>
              <ProductSkeleton />
            </SwiperSlide>
          )) : brand.products.map((product) => (
            <SwiperSlide key={product._id}>
                <Product {...product} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Section>
  );
};

export default BrandSection;