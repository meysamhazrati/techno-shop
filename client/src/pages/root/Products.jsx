import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useProducts from "../../hooks/product/products";
import Section from "../../components/root/Section";
import SectionHeader from "../../components/root/SectionHeader";
import Filters from "../../components/root/Filters";
import Sort from "../../components/root/Sort";
import InfiniteScroll from "../../components/InfiniteScroll";
import Product from "../../components/root/Product";
import ProductSkeleton from "../../components/root/ProductSkeleton";
import NoResultFound from "../../components/NoResultFound";

const Products = () => {
  const [searchParams] = useSearchParams();
  const { isFetchingProducts, isProductsError, products, hasProductsNextPage, fetchProductsNextPage } = useProducts(searchParams.get("search")?.toLowerCase().split(" ").join("-"), searchParams.get("brands"), searchParams.get("categories"), searchParams.get("price"), searchParams.get("only-available"), searchParams.get("only-amazing"), searchParams.get("sort"), 12);

  useEffect(() => {
    document.title = "تکنوشاپ - محصولات";
  }, []);

  return (
    <>
      <SectionHeader title="محصولات" condition={true} quantity={isProductsError || isFetchingProducts ? 0 : products.length} />
      <Section className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <Filters brandsFilter={true} categoriesFilter={true} priceFilter={true} onlyAvailableFilter={true} onlyAmazingFilter={true} />
        <div className="w-full">
          <Sort sortFor="products" />
          {isProductsError ? (
            <NoResultFound title="محصولی پیدا نشد!" />
          ) : (
            <InfiniteScroll hasNextPage={hasProductsNextPage} fetchNextPage={fetchProductsNextPage}>
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {products?.map((product) => <Product key={product._id} {...product} />)}
                {isFetchingProducts && Array(6).fill(0).map((product, index) => <ProductSkeleton key={index} />)}
              </div>
            </InfiniteScroll>
          )}
        </div>
      </Section>
    </>
  );
};

export default Products;