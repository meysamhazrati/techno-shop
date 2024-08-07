import useBrands from "../../hooks/brand/useBrands";
import Section from "./Section";
import Brand from "./Brand";
import BrandSkeleton from "./BrandSkeleton";

const Brands = () => {
  const { isFetchingBrands, isBrandsError, brands } = useBrands(7);

  return !isBrandsError && (
    <Section className="flex flex-wrap items-center justify-center gap-[19.5px] xs:gap-8 md:gap-6 lg:justify-between lg:gap-2">
      {isFetchingBrands ? Array(7).fill().map((brand, index) => <BrandSkeleton key={index} />) : brands.map((brand) => <Brand key={brand._id} {...brand} />)}
    </Section>
  );
};

export default Brands;