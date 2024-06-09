import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SortIcon from "../../icons/SortIcon";

const Sort = ({ sortFor }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState(searchParams.get("sort") || null);

  useEffect(() => {
    const newSearchParams = {
      search: searchParams.get("search"),
      brands: searchParams.get("brands"),
      categories: searchParams.get("categories"),
      price: searchParams.get("price"),
      "only-available": searchParams.get("only-available"),
      "only-amazing": searchParams.get("only-amazing"),
      sort,
    };

    for (const searchParam in newSearchParams) {
      !newSearchParams[searchParam] && delete newSearchParams[searchParam];
    }

    setSearchParams(newSearchParams);
  }, [sort, searchParams, setSearchParams]);

  return (
    <div className="flex h-20 items-center gap-x-6 rounded-3xl bg-white px-4 md:w-full lg:w-[608px] xl:w-full">
      <div className="flex items-center gap-x-1">
        <SortIcon className="size-7" />
        <span className="text-xl">مرتب‌سازی:</span>
      </div>
      <div className="flex items-center gap-x-4 overflow-auto py-2 [&>*]:text-lg">
        <button className={`text-${(sort === "oldest" || sort === "popular" || sort === "best-seller" || sort === "cheap" || sort === "expensive") ? "zinc-500" : "primary-900"}`} onClick={() => setSort(null)}>جدیدترین</button>
        {sortFor === "articles" ? (
          <>
            <button className={`text-${sort === "oldest" ? "primary-900" : "zinc-500"}`} onClick={() => setSort("oldest")}>{"قدیمی‌ترین"}</button>
            <button className={`text-${sort === "popular" ? "primary-900" : "zinc-500"}`} onClick={() => setSort("popular")}>{"محبوب‌ترین"}</button>
          </>
        ) : (
          <>
            <button className={`text-${sort === "best-seller" ? "primary-900" : "zinc-500"}`} onClick={() => setSort("best-seller")}>{"پرفروش‌ترین"}</button>
            <button className={`text-${sort === "popular" ? "primary-900" : "zinc-500"}`} onClick={() => setSort("popular")}>{"محبوب‌ترین"}</button>
            <button className={`text-${sort === "cheap" ? "primary-900" : "zinc-500"}`} onClick={() => setSort("cheap")}>{"ارزان‌ترین"}</button>
            <button className={`text-${sort === "expensive" ? "primary-900" : "zinc-500"}`} onClick={() => setSort("expensive")}>{"گران‌ترین"}</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Sort;