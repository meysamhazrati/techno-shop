import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useCategories from "../../hooks/category/useCategories";
import ChevronIcon from "../../icons/ChevronIcon";

const CategoriesFilter = ({ setCategories }) => {
  const [searchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const { isFetchingCategories, isCategoriesError, categories } = useCategories();

  return (
    <div className="pt-4">
      <div className="flex w-full items-center justify-between">
        <span className="text-xl">دسته‌بندی‌ ها</span>
        <button className="flex size-8 items-center justify-center rounded-full transition-colors hover:bg-zinc-200 hover:text-zinc-700" onClick={() => setIsOpen((isOpen) => !isOpen)}>
          <ChevronIcon className={`size-5 ${isOpen ? "-rotate-90" : "rotate-90"} transition-transform`} />
        </button>
      </div>
      <div className={`mt-4 ${isOpen ? "max-h-28 pb-3" : "max-h-0"} flex flex-col gap-y-1 overflow-auto px-3 transition-all`}>
        {isCategoriesError ? (
          <span className="text-center text-lg">دسته‌بندی‌ای پیدا نشد!</span>
        ) :isFetchingCategories ? Array(4).fill(0).map((category, index) => (
          <div key={index} className="flex items-center gap-x-3">
            <input type="checkbox" className="size-4 shrink-0 cursor-pointer appearance-none rounded bg-zinc-200" />
            <div className="flex w-full items-center justify-between gap-x-3">
              <span className="text-lg">در حال بارگذاری</span>
              <span className="text-sm text-zinc-500">در حال بارگذاری</span>
            </div>
          </div>
        )) : categories.map(({ _id, title, englishTitle }) => (
          <div key={_id} className="flex items-center gap-x-3">
            <input
              type="checkbox"
              checked={searchParams.get("categories")?.split(",").some((category) => category === englishTitle.toLowerCase().split(" ").join("-")) || false}
              className="size-4 shrink-0 cursor-pointer appearance-none rounded bg-zinc-200 transition-colors checked:bg-primary-900"
              onChange={({ target }) => setCategories((categories) => target.checked ? [...categories, englishTitle.toLowerCase().split(" ").join("-")] : categories.filter((category) => category !== englishTitle.toLowerCase().split(" ").join("-")))}
            />
            <div className="flex w-full items-center justify-between gap-x-3">
              <span className="text-lg">{title}</span>
              <span className="text-sm text-zinc-500">{englishTitle}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesFilter;