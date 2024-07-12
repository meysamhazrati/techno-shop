import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import useOffer from "../../hooks/offer/useOffer";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import Product from "./Product";
import ProductSkeleton from "./ProductSkeleton";
import NoResultFound from "../NoResultFound";

const OfferSection = ({ title, englishTitle, percent, expiresAt }) => {
  const { isFetchingOffer, isOfferError, offer } = useOffer(englishTitle.toLowerCase().split(" ").join("-"), null, null, null, null, null, 10);

  return !isOfferError && (
    <Section>
      <SectionHeader title={title} condition={offer?.products.length > 4} button={true} route={`/offers/${englishTitle.toLowerCase().split(" ").join("-")}`} />
      {offer?.products.length === 0 ? (
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
          {isFetchingOffer ? Array(5).fill().map((product, index) => (
            <SwiperSlide key={index}>
              <ProductSkeleton />
            </SwiperSlide>
          )) : offer.products.map((product) => (
            <SwiperSlide key={product._id}>
                <Product {...product} offer={{ title, englishTitle, percent, expiresAt }} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Section>
  );
};

export default OfferSection;