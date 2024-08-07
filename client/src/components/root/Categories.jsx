import useCategories from "../../hooks/category/useCategories";
import Section from "./Section";
import Category from "./Category";
import CategorySkeleton from "./CategorySkeleton";

const Categories = () => {
  const { isFetchingCategories, isCategoriesError, categories } = useCategories();

  return !isCategoriesError && (
    <Section className="flex flex-wrap items-center justify-center gap-[19.5px] xs:gap-8 md:gap-6 lg:justify-between lg:gap-2">
      {isFetchingCategories ? Array(7).fill().map((category, index) => <CategorySkeleton key={index} />) : categories.map((category) => <Category key={category._id} {...category} />)}
    </Section>
  );
};

export default Categories;