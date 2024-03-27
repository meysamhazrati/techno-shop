import { Link } from "react-router-dom";
import useArticles from "../../hooks/article/articles";
import Article from "./Article";
import ArticleSkeleton from "./ArticleSkeleton";
import NoArticleFound from "./NoArticleFound";
import ChevronLeftIcon from "../../icons/ChevronLeft";

const Articles = () => {
  const { isFetchingArticles, isArticlesError, articles } = useArticles(null, null, 4);

  return (
    <section className="mt-12">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-vazirmatn-bold text-3xl">خواندنی ها</h2>
        {articles?.length > 4 && (
          <Link to="/articles" className="mr-auto flex h-12 w-40 items-center justify-center gap-x-2 rounded-full font-vazirmatn-medium text-primary-900 transition-colors hover:bg-primary-50">
            <span className="text-lg">مشاهده همه</span>
            <ChevronLeftIcon className="size-5" />
          </Link>
        )}
      </div>
      {isArticlesError ? (
        <NoArticleFound />
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isFetchingArticles ? Array(4).fill(0).map((article, index) => <ArticleSkeleton key={index} />) : articles?.map((article) => <Article key={article._id} {...article} />)}
        </div>
      )}
    </section>
  );
};

export default Articles;