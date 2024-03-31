import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import useCategory from "../../hooks/category/category";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import Product from "./Product";
import ProductSkeleton from "./ProductSkeleton";
import NoResultFound from "../NoResultFound";

const CategorySection = ({ title, englishTitle }) => {
  const { isFetchingCategory, category } = useCategory(englishTitle.toLowerCase().split(" ").join("-"), null, null, null, null, null, 10);

  return (
    <Section>
      <SectionHeader title={title} condition={category?.products.length > 4} button={true} route={`/categories/${englishTitle.toLowerCase().split(" ").join("-")}`} />
      {category?.products.length === 0 ? (
        <NoResultFound title="محصولی پیدا نشد!" />
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
          {isFetchingCategory ? Array(5).fill(0).map((product, index) => (
            <SwiperSlide key={index}>
              <ProductSkeleton />
            </SwiperSlide>
          )) : category?.products.map((product) => (
            <SwiperSlide key={product._id}>
                <Product {...product} category={{ title, englishTitle }} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Section>
  );
};

export default CategorySection;