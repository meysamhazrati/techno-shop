import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ClassicEditor, Autosave, Essentials, Undo, Heading, Paragraph, Bold, Italic, Underline } from "ckeditor5";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import useArticle from "../../hooks/article/useArticle";
import useUpdateArticle from "../../hooks/article/useUpdateArticle";
import useCategories from "../../hooks/category/useCategories";
import InfiniteScroll from "../../components/InfiniteScroll";
import Comment from "../../components/admin/Comment";
import CommentSkeleton from "../../components/admin/CommentSkeleton";
import SelectBox from "../../components/SelectBox";
import NoResultFound from "../../components/NoResultFound";
import Loader from "../../components/Loader";

const Article = () => {
  const { id } = useParams();

  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [newCover, setNewCover] = useState(null);
  const [newIsPublished, setNewIsPublished] = useState(null);
  const [newCategory, setNewCategory] = useState(null);

  const image = useRef();
  const file = useRef();

  const { isFetchingArticle, isArticleError, article, hasArticleNextPage, fetchArticleNextPage } = useArticle(id, false, 20);
  const { isPendingUpdateArticle, updateArticle } = useUpdateArticle(id);
  const { categories } = useCategories();

  useEffect(() => {
    document.title = isFetchingArticle || isArticleError ? "تکنوشاپ - مدیریت" : `تکنوشاپ - مدیریت - مقاله ها - ${article.title}`;

    if (!isFetchingArticle && !isArticleError) {
      setNewTitle(article.title);
      setNewBody(article.body);
      setNewIsPublished(article.isPublished);
      setNewCategory(article.category._id);
    }
  }, [isFetchingArticle, isArticleError, article]);

  useEffect(() => {
    if (isArticleError) {
      throw Object.assign(new Error("مقاله مورد نظر پیدا نشد."), { status: 404 });
    }
  }, [isArticleError]);

  return !isArticleError && (
    <>
      <div className="flex flex-col gap-3 overflow-auto sm:flex-row sm:items-center">
        {isFetchingArticle ? <div className="h-56 w-full animate-pulse rounded-3xl bg-skeleton sm:w-80 md:w-96 lg:w-80 xl:w-96"></div> : <img src={`${process.env.SERVER_URI}/images/articles/${article.cover}`} alt={article.title} loading="lazy" className="h-56 w-full rounded-3xl object-cover sm:w-80 md:w-96 lg:w-80 xl:w-96" />}
        <div className="flex flex-col gap-3 text-nowrap text-lg">
          <div className="flex items-center gap-x-2">
            <span className="text-zinc-400">عنوان:</span>
            <span>{isFetchingArticle ? "در حال بارگذاری" : article.title}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <span className="text-zinc-400">امتیاز:</span>
            <span>{isFetchingArticle ? "در حال بارگذاری" : `${article.score} ستاره`}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <span className="text-zinc-400">وضعیت:</span>
            <span>{isFetchingArticle ? "در حال بارگذاری" : article.isPublished ? "منتشر شده" : "پیش‌نویس شده"}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <span className="text-zinc-400">نویسنده:</span>
            <span>{isFetchingArticle ? "در حال بارگذاری" : `${article.author.firstName} ${article.author.lastName}`}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <span className="text-zinc-400">دسته‌بندی‌:</span>
            <span>{isFetchingArticle ? "در حال بارگذاری" : article.category.title}</span>
          </div>
        </div>
      </div>
      {!isFetchingArticle && <div className="mt-3 text-lg first:[&>*]:mt-0 [&>h3]:mt-3 [&>h3]:font-vazirmatn-bold [&>h3]:text-2xl [&>h4]:mt-2 [&>h4]:font-vazirmatn-bold [&>h4]:text-xl [&>p]:mt-1" dangerouslySetInnerHTML={{ __html: article.body }}></div>}
      <h6 className="mt-6 font-vazirmatn-bold text-xl">ویرایش مقاله</h6>
      <form className="mt-4 text-lg" onSubmit={(event) => {
        event.preventDefault();

        updateArticle({ title: newTitle, body: newBody, cover: newCover, isPublished: newIsPublished, category: newCategory });
      }}>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <div className="h-56 w-full shrink-0 cursor-pointer sm:w-72 md:w-96 lg:w-80 xl:w-96" onClick={() => file.current.click()}>
            <img ref={image} src={`${process.env.SERVER_URI}/images/articles/${article?.cover}`} alt={article?.title} loading="lazy" className="size-full rounded-3xl object-cover" />
            <input
              ref={file}
              type="file"
              accept="image/png, image/jpg, image/jpeg"
              className="hidden"
              onChange={({ target }) => {
                if (target.files[0]) {
                  const reader = new FileReader();

                  reader.addEventListener("load", ({ target }) => (image.current.src = target.result));

                  reader.readAsDataURL(target.files[0]);

                  setNewCover(target.files[0]);
                }
              }}
            />
          </div>
          <div className="flex w-full flex-col gap-y-4">
            <input
              type="text"
              value={newTitle}
              placeholder="عنوان"
              className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
              onInput={({ target }) => setNewTitle(target.value)}
            />
            <SelectBox
              title={"وضعیت"}
              options={[
                { title: "انتشار", value: true },
                { title: "پیش‌نویس", value: false },
              ]}
              currentValue={newIsPublished}
              setValue={setNewIsPublished}
            />
            <SelectBox
              title={"دسته‌بندی‌"}
              options={categories?.map(({ _id, title }) => ({ title, value: _id }))}
              currentValue={newCategory}
              setValue={setNewCategory}
            />
          </div>
        </div>
        <div className="mt-3 w-full [&>*]:rounded-3xl">
          <CKEditor
            editor={ClassicEditor}
            data={newBody}
            config={{
              language: "fa",
              placeholder: "متن",
              toolbar: { items: ["undo", "redo", "|", "heading", "|", "bold", "italic", "underline"] },
              heading: {
                options: [
                  { model: "heading1", view: "h3", title: "Heading 1", class: "ck-heading_heading1" },
                  { model: "heading2", view: "h4", title: "Heading 2", class: "ck-heading_heading2" },
                  { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
                ],
              },
              plugins: [Autosave, Essentials, Undo, Heading, Paragraph, Bold, Italic, Underline],
            }}
            onChange={(event, editor) => setNewBody(editor.getData())}
          />
        </div>
        <button disabled={isPendingUpdateArticle} className="mt-4 flex h-14 w-full items-center justify-center text-nowrap rounded-full bg-primary-900 text-white transition-colors enabled:hover:bg-primary-800">
          {isPendingUpdateArticle ? <Loader width={"40px"} height={"10px"} color={"#ffffff"} /> : "ویرایش"}
        </button>
      </form>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-vazirmatn-bold text-xl">دیدگاه ها</h2>
        <span className="mr-auto text-zinc-500">{isFetchingArticle ? 0 : article.comments.length.toLocaleString()} دیدگاه</span>
      </div>
      {article?.comments.length === 0 ? (
        <NoResultFound title="دیدگاهی پیدا نشد!" className="mt-4" />
      ) : (
        <div className="mt-4 overflow-auto rounded-3xl border border-zinc-200">
          <table className="w-full text-nowrap text-lg">
            <thead className="bg-zinc-200">
              <tr className="[&>*]:h-[72px] [&>*]:px-5 [&>*]:font-vazirmatn-medium [&>*]:font-normal">
                <th>امتیاز</th>
                <th>وضعیت</th>
                <th>فرستنده</th>
                <th>تاریخ ثبت</th>
                <th></th>
              </tr>
            </thead>
            <InfiniteScroll hasNextPage={hasArticleNextPage} fetchNextPage={fetchArticleNextPage}>
              <tbody>
                {article?.comments.map((comment) => <Comment key={comment._id} {...comment} />)}
                {isFetchingArticle && Array(20).fill().map((comment, index) => <CommentSkeleton key={index} senderField={true} />)}
              </tbody>
            </InfiniteScroll>
          </table>
        </div>
      )}
    </>
  );
};

export default Article;