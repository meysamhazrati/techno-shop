import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useArticle from "../../hooks/article/useArticle";
import Section from "../../components/root/Section";
import Breadcrumb from "../../components/root/Breadcrumb";
import UserAvatar from "../../components/UserAvatar";
import Comments from "../../components/root/Comments";
import RelatedProducts from "../../components/root/RelatedProducts";
import StarIcon from "../../icons/StarIcon";

const Article = () => {
  const { id } = useParams();
  const { isFetchingArticle, isArticleError, article, hasArticleNextPage, fetchArticleNextPage } = useArticle(id, 10);

  useEffect(() => {
    document.title = isArticleError || isFetchingArticle ? "تکنوشاپ" : `تکنوشاپ - ${article.title}`;
  }, [isArticleError, isFetchingArticle, article]);

  useEffect(() => {
    if (isArticleError) {
      throw Object.assign(new Error("The article was not found."), { status: 404 });
    }
  }, [isArticleError]);

  return !isArticleError && (
    <>
      <Breadcrumb title={isFetchingArticle ? "در حال بارگذاری" : article.title} route={isFetchingArticle ? "/articles" : `/articles/${article._id}`} categoryTitle={isFetchingArticle ? "در حال بارگذاری" : article.category.title} categoryRoute={isFetchingArticle ? "/categories" : `/categories/${article.category.englishTitle.toLowerCase().split(" ").join("-")}`} />
      <Section className="flex flex-col-reverse items-start gap-6 lg:flex-row">
        {isFetchingArticle ? (
          <>
            <div className="w-full animate-pulse rounded-3xl bg-white p-6">
              <div className="hidden lg:block">
                <div className="h-6 rounded-full bg-skeleton"></div>
                <div className="mt-2 h-6 w-3/5 rounded-full bg-skeleton"></div>
              </div>
              <div className="h-64 rounded-3xl bg-skeleton md:h-96 lg:mt-6"></div>
              <div>
                <div className="mt-6 h-5 rounded-full bg-skeleton"></div>
                <div className="mt-2 h-5 rounded-full bg-skeleton"></div>
                <div className="mt-2 h-5 rounded-full bg-skeleton"></div>
                <div className="mt-2 h-5 rounded-full bg-skeleton"></div>
                <div className="mt-2 h-5 rounded-full bg-skeleton"></div>
                <div className="mt-2 h-5 rounded-full bg-skeleton"></div>
                <div className="mt-2 h-5 w-1/2 rounded-full bg-skeleton"></div>
              </div>
            </div>
            <div className="w-full shrink-0 animate-pulse rounded-3xl bg-white p-6 lg:sticky lg:top-[104px] lg:w-96">
              <div className="flex items-center gap-x-3">
                <div className="size-16 rounded-full bg-skeleton"></div>
                <div>
                  <div className="h-5 w-32 rounded-full bg-skeleton"></div>
                  <div className="mt-2 h-4 w-24 rounded-full bg-skeleton"></div>
                </div>
              </div>
              <div className="mt-6">
                <div className="h-6 rounded-full bg-skeleton"></div>
                <div className="mt-2 h-6 w-3/5 rounded-full bg-skeleton"></div>
              </div>
              <div className="mt-5 h-5 w-1/2 rounded-full bg-skeleton"></div>
            </div>
          </>
        ) : (
          <>
            <div className="w-full rounded-3xl bg-white p-6">
              <h2 className="line-clamp-2 hidden font-vazirmatn-bold text-2xl/relaxed lg:block">{article.title}</h2>
              <img src={`${process.env.SERVER_URI}/images/articles/${article.cover}`} alt="Article Cover" className="w-full rounded-3xl object-cover lg:mt-4" />
              <div className="mt-6 border-t border-zinc-200 pt-6 text-lg first:[&>*]:mt-0 [&>h3]:mt-4 [&>h3]:font-vazirmatn-bold [&>h3]:text-2xl [&>h4]:mt-3 [&>h4]:font-vazirmatn-bold [&>h4]:text-xl [&>p]:mt-1" dangerouslySetInnerHTML={{ __html: article.body }}></div>
            </div>
            <aside className="w-full shrink-0 rounded-3xl bg-white p-6 lg:sticky lg:top-[104px] lg:w-96">
              <div className="flex items-center gap-x-3">
                <UserAvatar user={article.author} className="size-16 text-xl" />
                <div>
                  <h5 className="line-clamp-1 font-vazirmatn-medium text-2xl">{article?.author.firstName} {article?.author.lastName}</h5>
                  <span className="mt-1 block text-lg text-zinc-400">{new Intl.DateTimeFormat("fa", { dateStyle: "medium" }).format(Date.parse(article.createdAt))}</span>
                </div>
              </div>
              <h2 className="mt-6 line-clamp-2 font-vazirmatn-bold text-2xl/relaxed">{article.title}</h2>
              <div className="mt-4 flex flex-wrap items-center gap-x-2 text-lg">
                <div className="flex items-center gap-x-1">
                  <StarIcon className="size-4 text-yellow-400" />
                  <span>{article.score}</span>
                </div>
                <div className="size-1.5 rounded-full bg-zinc-400"></div>
                <Link to={`/categories/${article.category.englishTitle.toLowerCase().split(" ").join("-")}`} className="transition-colors hover:text-primary-900">{article.category.title}</Link>
                <div className="size-1.5 rounded-full bg-zinc-400"></div>
                <span>{article.totalComments.toLocaleString()} دیدگاه</span>
              </div>
            </aside>
          </>
        )}
      </Section>
      <Comments isFetching={isFetchingArticle} isError={isArticleError} hasNextPage={hasArticleNextPage} fetchNextPage={fetchArticleNextPage} id={article?._id} comments={article?.comments} totalComments={article?.totalComments} submitFor="article" />
      {!isFetchingArticle && <RelatedProducts categoryTitle={article.category.englishTitle} />}
    </>
  );
};

export default Article;