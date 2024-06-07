import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import useOffers from "../../hooks/offer/useOffers";
import Section from "../../components/root/Section";
import SectionHeader from "../../components/root/SectionHeader";
import OfferSection from "../../components/root/OfferSection";
import ProductSkeleton from "../../components/root/ProductSkeleton";
import NoResultFound from "../../components/NoResultFound";

const Offers = () => {
  const { isFetchingOffers, isOffersError, offers } = useOffers();

  useEffect(() => {
    document.title = "تکنوشاپ - پیشنهاد ها";
  }, []);

  return isOffersError || offers?.filter(({ expiresAt }) => Date.parse(expiresAt) > Date.now()).length === 0 ? (
    <NoResultFound title="پیشنهادی پیدا نشد!" className="mt-8" />
  ) : isFetchingOffers ? (
    Array(3).fill(0).map((offer, index) => (
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
    offers.filter(({ expiresAt }) => Date.parse(expiresAt) > Date.now()).map((offer) => <OfferSection key={offer._id} {...offer} />)
  );
};

export default Offers;