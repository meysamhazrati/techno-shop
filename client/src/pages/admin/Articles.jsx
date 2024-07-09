import { useState, useRef, useEffect } from "react";
import { ClassicEditor, Autosave, Essentials, Undo, Heading, Paragraph, Bold, Italic, Underline } from "ckeditor5";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import useArticles from "../../hooks/article/useArticles";
import useCreateArticle from "../../hooks/article/useCreateArticle";
import useCategories from "../../hooks/category/useCategories";
import InfiniteScroll from "../../components/InfiniteScroll";
import Article from "../../components/admin/Article";
import ArticleSkeleton from "../../components/admin/ArticleSkeleton";
import SelectBox from "../../components/SelectBox";
import NoResultFound from "../../components/NoResultFound";
import Loader from "../../components/Loader";
import "ckeditor5/ckeditor5.css";

const Articles = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [cover, setCover] = useState(null);
  const [isPublished, setIsPublished] = useState(false);
  const [category, setCategory] = useState(null);

  const image = useRef();
  const file = useRef();

  const { isFetchingArticles, isArticlesError, articles, total, hasArticlesNextPage, fetchArticlesNextPage } = useArticles(null, false, null, 20);
  const { isPendingCreateArticle, createArticle } = useCreateArticle();
  const { categories } = useCategories();

  useEffect(() => {
    document.title = "تکنوشاپ - مدیریت - مقاله ها";
  }, []);

  return (
    <>
      <h6 className="font-vazirmatn-bold text-xl">ثبت مقاله جدید</h6>
      <form className="mt-4 text-lg" onSubmit={(event) => {
        event.preventDefault();

        createArticle({ title: title?.trim(), body: body?.trim(), cover, isPublished, category: category?.trim() }, { onSuccess: () => {
          setTitle("");
          setBody("");
          setCover(null);
          setIsPublished(false);
          setCategory(null);
          image.current.src = "";
          file.current.value = null;
        } });
      }}>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <div className="h-56 w-full shrink-0 cursor-pointer sm:w-72 md:w-96 lg:w-80 xl:w-96" onClick={() => file.current.click()}>
            {file.current?.files.length ? <img ref={image} alt="Article Cover" loading="lazy" className="size-full rounded-3xl object-cover" /> : <div className="flex size-full items-center justify-center rounded-3xl border border-zinc-200 text-zinc-400">کاور</div>}
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

                  setCover(target.files[0]);
                }
              }}
            />
          </div>
          <div className="flex w-full flex-col gap-y-4">
            <input
              type="text"
              value={title}
              placeholder="عنوان"
              className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
              onInput={({ target }) => setTitle(target.value)}
            />
            <SelectBox
              title={"وضعیت"}
              options={[
                { title: "انتشار", value: true },
                { title: "پیش‌نویس", value: false },
              ]}
              currentValue={isPublished}
              setValue={setIsPublished}
            />
            <SelectBox
              title={"دسته‌بندی‌"}
              options={categories?.map(({ _id, title }) => ({ title, value: _id }))}
              currentValue={category}
              setValue={setCategory}
            />
          </div>
        </div>
        <div className="mt-3 w-full [&>*]:rounded-3xl">
          <CKEditor
            editor={ClassicEditor}
            data={body}
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
            onChange={(event, editor) => setBody(editor.getData())}
          />
        </div>
        <button disabled={isPendingCreateArticle} className="mt-4 flex h-14 w-full items-center justify-center text-nowrap rounded-full bg-primary-900 text-white transition-colors enabled:hover:bg-primary-800">
          {isPendingCreateArticle ? <Loader width={"40px"} height={"10px"} color={"#ffffff"} /> : "ثبت"}
        </button>
      </form>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-vazirmatn-bold text-xl">مقاله ها</h2>
        <span className="mr-auto text-zinc-500">{isFetchingArticles || isArticlesError ? 0 : total.toLocaleString()} مقاله</span>
      </div>
      {isArticlesError ? (
        <NoResultFound title="مقاله‌ای پیدا نشد!" className="mt-4" />
      ) : (
        <div className="mt-4 overflow-auto rounded-3xl border border-zinc-200">
          <table className="w-full text-nowrap text-lg">
            <thead className="bg-zinc-200">
              <tr className="[&>*]:h-[72px] [&>*]:px-5 [&>*]:font-vazirmatn-medium [&>*]:font-normal">
                <th>کاور</th>
                <th>عنوان</th>
                <th>امتیاز</th>
                <th>وضعیت</th>
                <th>نویسنده</th>
                <th>دسته‌بندی‌</th>
                <th></th>
              </tr>
            </thead>
            <InfiniteScroll hasNextPage={hasArticlesNextPage} fetchNextPage={fetchArticlesNextPage}>
              <tbody>
                {articles?.map((article) => <Article key={article._id} {...article} />)}
                {isFetchingArticles && Array(20).fill().map((article, index) => <ArticleSkeleton key={index} />)}
              </tbody>
            </InfiniteScroll>
          </table>
        </div>
      )}
    </>
  );
};

export default Articles;