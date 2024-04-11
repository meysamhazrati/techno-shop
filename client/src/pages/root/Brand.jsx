import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import useBrand from "../../hooks/brand/brand";
import Section from "../../components/root/Section";
import SectionHeader from "../../components/root/SectionHeader";
import Filters from "../../components/root/Filters";
import Sort from "../../components/root/Sort";
import InfiniteScroll from "../../components/InfiniteScroll";
import Product from "../../components/root/Product";
import ProductSkeleton from "../../components/root/ProductSkeleton";
import NoResultFound from "../../components/NoResultFound";

const Brand = () => {
  const { name } = useParams();
  const [searchParams] = useSearchParams();
  const { isFetchingBrand, isBrandError, brand, hasBrandNextPage, fetchBrandNextPage } = useBrand(name.toLowerCase().split(" ").join("-"), searchParams.get("categories"), searchParams.get("price"), searchParams.get("only-available"), searchParams.get("only-amazing"), searchParams.get("sort"), 12);

  useEffect(() => {
    document.title = isBrandError || isFetchingBrand ? "تکنوشاپ" : `تکنوشاپ - ${brand.name}`;
  }, [isBrandError, isFetchingBrand, brand]);

  useEffect(() => {
    if (isBrandError) {
      throw Object.assign(new Error("The brand was not found."), { status: 404 });
    }
  }, [isBrandError]);

  return !isBrandError && (
    <>
      <SectionHeader title={isFetchingBrand ? "در حال بارگذاری" : brand.name} condition={true} quantity={isFetchingBrand ? 0 : brand.totalProducts} />
      <Section className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <Filters categoriesFilter={true} priceFilter={true} onlyAvailableFilter={true} onlyAmazingFilter={true} />
        <div className="w-full">
          <Sort sortFor="products" />
          {brand?.products.length === 0 ? (
            <NoResultFound title="محصولی پیدا نشد!" />
          ) : (
            <InfiniteScroll hasNextPage={hasBrandNextPage} fetchNextPage={fetchBrandNextPage}>
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {brand?.products.map((product) => <Product key={product._id} {...product} />)}
                {isFetchingBrand && Array(6).fill(0).map((product, index) => <ProductSkeleton key={index} />)}
              </div>
            </InfiniteScroll>
          )}
        </div>
      </Section>
    </>
  );
};

export default Brand;