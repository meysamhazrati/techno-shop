import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import useCategories from "../../hooks/category/categories";
import Section from "../../components/root/Section";
import SectionHeader from "../../components/root/SectionHeader";
import CategorySection from "../../components/root/CategorySection";
import ProductSkeleton from "../../components/root/ProductSkeleton";
import NoResultFound from "../../components/NoResultFound";

const Categories = () => {
  const { isFetchingCategories, isCategoriesError, categories } = useCategories(7);

  useEffect(() => {
    document.title = "تکنوشاپ - دسته‌بندی‌ ها";
  }, []);

  return isCategoriesError ? (
    <NoResultFound title="دسته‌بندی‌ای پیدا نشد!" />
  ) : isFetchingCategories ? (
    Array(3).fill(0).map((category, index) => (
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
    categories.map((category) => <CategorySection key={category._id} {...category} />)
  );
};

export default Categories;