import useProducts from "../../hooks/product/useProducts";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import Product from "./Product";
import ProductSkeleton from "./ProductSkeleton";
import NoResultFound from "../NoResultFound";

const Latests = () => {
  const { isFetchingProducts, isProductsError, products } = useProducts(null, null, null, null, null, null, null, 8);

  return (
    <Section>
      <SectionHeader title="جدیدترین ها" condition={products?.length === 8} button={true} route="/products" />
      {isProductsError ? (
        <NoResultFound title="محصولی پیدا نشد!" className="mt-8" />
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isFetchingProducts ? Array(8).fill().map((product, index) => <ProductSkeleton key={index} />) : products.map((product) => <Product key={product._id} {...product} />)}
        </div>
      )}
    </Section>
  );
};

export default Latests;