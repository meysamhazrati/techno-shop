import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import useBrands from "../../hooks/brand/brands";
import Section from "../../components/root/Section";
import SectionHeader from "../../components/root/SectionHeader";
import BrandSection from "../../components/root/BrandSection";
import ProductSkeleton from "../../components/root/ProductSkeleton";
import NoResultFound from "../../components/NoResultFound";

const Brands = () => {
  const { isFetchingBrands, isBrandsError, brands } = useBrands();

  useEffect(() => {
    document.title = "تکنوشاپ - برند ها";
  }, []);

  return isBrandsError ? (
    <NoResultFound title="برندی پیدا نشد!" className="mt-8" />
  ) : isFetchingBrands ? (
    Array(3).fill(0).map((brand, index) => (
      <Section key={index}>
        <SectionHeader title="در حال بارگذاری" condition={false} />
        {<Swiper
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
          {Array(5).fill(0).map((product, index) => (
            <SwiperSlide key={index}>
              <ProductSkeleton />
            </SwiperSlide>
          ))}
        </Swiper>}
      </Section>
      ))
  ) : (
    brands.map((brand) => <BrandSection key={brand._id} {...brand} />)
  );
};

export default Brands;