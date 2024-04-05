import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BarsArrowDownIcon from "../../icons/BarsArrowDown";

const Sorts = ({ sortFor }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState(searchParams.get("sort") || null);
  const [sorts, setSorts] = useState([]);

  useEffect(() => {
    setSorts(sortFor === "articles" ? [
      { title: "قدیمی‌ترین", searchParam: "oldest" },
      { title: "محبوب‌ترین", searchParam: "popular" },
    ] : [
      { title: "پرفروش‌ترین", searchParam: "best-seller" },
      { title: "محبوب‌ترین", searchParam: "popular" },
      { title: "ارزان‌ترین", searchParam: "cheap" },
      { title: "گران‌ترین", searchParam: "expensive" },
    ]);
  }, [sortFor]);

  useEffect(() => {
    const newSearchParams = {
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
        <BarsArrowDownIcon className="size-7" />
        <span className="text-xl">مرتب‌سازی:</span>
      </div>
      <div className="flex items-center gap-x-4 overflow-auto py-2 [&>*]:text-lg">
        <button className={`text-${sorts.some(({ searchParam }) => searchParam === sort) ? "zinc-500" : "primary-900"}`} onClick={() => setSort(null)}>جدیدترین</button>
        {sorts.map(({ title, searchParam }, index) => <button key={index} className={`text-${sort === searchParam ? "primary-900" : "zinc-500"}`} onClick={() => setSort(searchParam)}>{title}</button>)}
      </div>
    </div>
  );
};

export default Sorts;