import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import useCategories from "../../hooks/category/categories";
import Header from "../../components/root/Header";
import Section from "../../components/root/Section";
import SectionHeader from "../../components/root/SectionHeader";
import CategorySection from "../../components/root/CategorySection";
import ProductSkeleton from "../../components/root/ProductSkeleton";
import NoResultFound from "../../components/NoResultFound";
import MobileNavigation from "../../components/MobileNavigation";
import Footer from "../../components/root/Footer";

const Categories = () => {
  const { isFetchingCategories, isCategoriesError, categories } = useCategories(7);

  useEffect(() => {
    document.title = "تکنوشاپ - دسته‌بندی‌ ها";
  }, []);

  return (
    <>
      <Header />
      <main className="container flex min-h-screen flex-col justify-center pb-20 pt-24 xs:pb-24 lg:min-h-max lg:pb-12 lg:pt-44">
        {isCategoriesError ? (
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
        )}
      </main>
      <MobileNavigation />
      <Footer />
    </>
  );
};

export default Categories;