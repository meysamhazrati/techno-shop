import useArticles from "../../hooks/article/useArticles";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import Article from "./Article";
import ArticleSkeleton from "./ArticleSkeleton";
import NoResultFound from "../NoResultFound";

const Articles = () => {
  const { isFetchingArticles, isArticlesError, articles } = useArticles(null, true, null, 4);

  return (
    <Section>
      <SectionHeader title="خواندنی ها" condition={articles?.length === 4} button={true} route="/articles" />
      {isArticlesError ? (
        <NoResultFound title="مقاله‌ای پیدا نشد!" className="mt-8" />
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isFetchingArticles ? Array(4).fill(0).map((article, index) => <ArticleSkeleton key={index} />) : articles.map((article) => <Article key={article._id} {...article} />)}
        </div>
      )}
    </Section>
  );
};

export default Articles;