import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import useOffer from "../../hooks/offer/offer";
import Section from "../../components/root/Section";
import SectionHeader from "../../components/root/SectionHeader";
import Filters from "../../components/root/Filters";
import Sort from "../../components/root/Sort";
import InfiniteScroll from "../../components/InfiniteScroll";
import Product from "../../components/root/Product";
import ProductSkeleton from "../../components/root/ProductSkeleton";
import NoResultFound from "../../components/NoResultFound";

const Offer = () => {
  const { title } = useParams();
  const [searchParams] = useSearchParams();
  const { isFetchingOffer, isOfferError, offer, hasOfferNextPage, fetchOfferNextPage } = useOffer(title.toLowerCase().split(" ").join("-"), searchParams.get("brands"), searchParams.get("categories"), searchParams.get("price"), searchParams.get("only-available"), searchParams.get("sort"), 12);

  useEffect(() => {
    document.title = isOfferError || isFetchingOffer ? "تکنوشاپ" : `تکنوشاپ - ${offer.title}`;
  }, [isOfferError, isFetchingOffer, offer]);

  useEffect(() => {
    if (isOfferError) {
      throw Object.assign(new Error("The offer was not found."), { status: 404 });
    }
  }, [isOfferError]);

  return !isOfferError && (
    <>
      <SectionHeader title={isFetchingOffer ? "در حال بارگذاری" : offer.title} condition={true}>
        <span className="mr-auto text-xl text-zinc-500">{isFetchingOffer ? 0 : offer.totalProducts} کالا</span>
      </SectionHeader>
      <Section className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <Filters brandsFilter={true} categoriesFilter={true} priceFilter={true} onlyAvailableFilter={true} />
        <div className="w-full">
          <Sort sortFor="products" />
          {offer?.products.length === 0 ? (
            <NoResultFound title="محصولی پیدا نشد!" className="mt-8" />
          ) : (
            <InfiniteScroll hasNextPage={hasOfferNextPage} fetchNextPage={fetchOfferNextPage}>
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {offer?.products.map((product) => <Product key={product._id} {...product} offer={offer} />)}
                {isFetchingOffer && Array(6).fill(0).map((product, index) => <ProductSkeleton key={index} />)}
              </div>
            </InfiniteScroll>
          )}
        </div>
      </Section>
    </>
  );
};

export default Offer;