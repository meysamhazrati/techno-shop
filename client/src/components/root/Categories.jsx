import useCategories from "../../hooks/category/categories";
import Category from "./Category";
import CategorySkeleton from "./CategorySkeleton";

const Categories = () => {
  const { isFetchingCategories, isCategoriesError, categories } = useCategories(7);

  return !isCategoriesError && (
    <section className="mt-12 flex flex-wrap items-center justify-center gap-[19.5px] xs:gap-8 md:gap-6 lg:justify-between lg:gap-2">
      {isFetchingCategories ? Array(7).fill(0).map((category, index) => <CategorySkeleton key={index} />) : categories?.map((category) => <Category key={category._id} {...category} />)}
    </section>
  );
};

export default Categories;