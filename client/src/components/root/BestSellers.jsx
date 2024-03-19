import { Link } from "react-router-dom";
import useProducts from "../../hooks/product/products";
import Product from "./Product";
import ProductSkeleton from "./ProductSkeleton";
import NoProductFound from "../NoProductFound";
import ChevronLeftIcon from "../../icons/ChevronLeft";

const BestSellers = () => {
  const { isFetchingProducts, isProductsError, products } = useProducts("best-sellers", 8);

  return (
    <section className="mt-24">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-vazirmatn-bold text-3xl">پرفروش‌ترین ها</h2>
        <Link to="/products" className="mr-auto flex h-12 w-40 items-center justify-center gap-x-2 rounded-full font-vazirmatn-medium text-primary-900 transition-colors hover:bg-primary-50">
          <span className="text-lg">مشاهده همه</span>
          <ChevronLeftIcon className="size-5" />
        </Link>
      </div>
      {isProductsError ? (
        <NoProductFound />
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isFetchingProducts ? Array(8).fill(0).map((product, index) => <ProductSkeleton key={index} />) : products?.map((product) => <Product key={product._id} {...product} />)}
        </div>
      )}
    </section>
  );
};

export default BestSellers;