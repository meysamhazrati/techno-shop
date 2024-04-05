import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BrandsFilter from "./BrandsFilter";
import CategoriesFilter from "./CategoriesFilter";
import PriceFilter from "./PriceFilter";
import OnlyAvailableFilter from "./OnlyAvailableFilter";
import OnlyAmazingFilter from "./OnlyAmazingFilter";
import AdjustmentsIcon from "../../icons/Adjustments";

const Filters = ({ brandsFilter, categoriesFilter, priceFilter, onlyAvailableFilter, onlyAmazingFilter }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [brands, setBrands] = useState(searchParams.get("brands")?.split(",") || []);
  const [categories, setCategories] = useState(searchParams.get("categories")?.split(",") || []);
  const [price, setPrice] = useState(searchParams.get("price")?.split("-") || []);
  const [onlyAvailable, setOnlyAvailable] = useState(searchParams.get("only-available") || false);
  const [onlyAmazing, setOnlyAmazing] = useState(searchParams.get("only-amazing") || false);

  useEffect(() => {
    const newSearchParams = {
      brands: brands.join(","),
      categories: categories.join(","),
      price: price.join("-"),
      "only-available": onlyAvailable,
      "only-amazing": onlyAmazing,
      sort: searchParams.get("sort"),
    };

    for (const searchParam in newSearchParams) {
      !newSearchParams[searchParam] && delete newSearchParams[searchParam];
    }

    setSearchParams(newSearchParams);
  }, [brands, categories, price, onlyAvailable, onlyAmazing, searchParams, setSearchParams]);

  return (
    <aside className="shrink-0 rounded-3xl bg-white px-4 pt-4 lg:sticky lg:top-28 lg:w-80">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <AdjustmentsIcon className="size-8" />
          <h6 className="text-2xl">فیلتر ها</h6>
        </div>
        {Array.from(searchParams.keys()).length !== 0 && Array.from(searchParams.keys())[0] !== "sort" && (
          <button className="text-primary-900" onClick={() => {
            setBrands([]);
            setCategories([]);
            setPrice([]);
            setOnlyAvailable(false);
            setOnlyAmazing(false);
          }}>حذف همه</button>
        )}
      </div>
      <div className="mt-4 divide-y divide-zinc-200">
        {brandsFilter && <BrandsFilter setBrands={setBrands} />}
        {categoriesFilter && <CategoriesFilter setCategories={setCategories} />}
        {priceFilter && <PriceFilter setPrice={setPrice} />}
        {onlyAvailableFilter && <OnlyAvailableFilter setOnlyAvailable={setOnlyAvailable} />}
        {onlyAmazingFilter && <OnlyAmazingFilter setOnlyAmazing={setOnlyAmazing} />}
      </div>
    </aside>
  );
};

export default Filters;