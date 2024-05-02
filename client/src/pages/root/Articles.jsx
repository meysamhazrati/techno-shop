import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useArticles from "../../hooks/article/articles";
import Section from "../../components/root/Section";
import SectionHeader from "../../components/root/SectionHeader";
import Filters from "../../components/root/Filters";
import Sort from "../../components/root/Sort";
import InfiniteScroll from "../../components/InfiniteScroll";
import Article from "../../components/root/Article";
import ArticleSkeleton from "../../components/root/ArticleSkeleton";
import NoResultFound from "../../components/NoResultFound";

const Articles = () => {
  const [searchParams] = useSearchParams();
  const { isFetchingArticles, isArticlesError, articles, hasArticlesNextPage, fetchArticlesNextPage } = useArticles(searchParams.get("categories"), true, true, searchParams.get("sort"), 12);

  useEffect(() => {
    document.title = "تکنوشاپ - مقالات";
  }, []);

  return (
    <>
      <SectionHeader title="مقالات" condition={true}>
        <span className="mr-auto text-xl text-zinc-500">{isArticlesError || isFetchingArticles ? 0 : articles.length} مقاله</span>
      </SectionHeader>
      <Section className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <Filters categoriesFilter={true} />
        <div className="w-full">
          <Sort sortFor="articles" />
          {isArticlesError ? (
            <NoResultFound title="مقاله‌ای پیدا نشد!" className="mt-8" />
          ) : (
            <InfiniteScroll hasNextPage={hasArticlesNextPage} fetchNextPage={fetchArticlesNextPage}>
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {articles?.map((article) => <Article key={article._id} {...article} />)}
                {isFetchingArticles && Array(6).fill(0).map((article, index) => <ArticleSkeleton key={index} />)}
              </div>
            </InfiniteScroll>
          )}
        </div>
      </Section>
    </>
  );
};

export default Articles;