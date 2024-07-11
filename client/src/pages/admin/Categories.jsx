import { useState, useRef, useEffect } from "react";
import useCategories from "../../hooks/category/useCategories";
import useCreateCategory from "../../hooks/category/useCreateCategory";
import InfiniteScroll from "../../components/InfiniteScroll";
import Category from "../../components/admin/Category";
import CategorySkeleton from "../../components/admin/CategorySkeleton";
import NoResultFound from "../../components/NoResultFound";
import Loader from "../../components/Loader";

const Categories = () => {
  const [title, setTitle] = useState("");
  const [englishTitle, setEnglishTitle] = useState("");
  const [logo, setLogo] = useState(null);

  const image = useRef();
  const file = useRef();

  const { isFetchingCategories, isCategoriesError, categories, totalCategories, hasCategoriesNextPage, fetchCategoriesNextPage } = useCategories(20);
  const { isPendingCreateCategory, createCategory } = useCreateCategory();

  useEffect(() => {
    document.title = "تکنوشاپ - مدیریت - دسته‌بندی‌ ها";
  }, []);

  return (
    <>
      <h6 className="font-vazirmatn-bold text-xl">ثبت دسته‌بندی‌ جدید</h6>
      <form className="mt-4 text-lg" onSubmit={(event) => {
        event.preventDefault();

        createCategory({ title, englishTitle, logo }, { onSuccess: () => {
          setTitle("");
          setEnglishTitle("");
          setLogo(null);
          image.current.src = "";
          file.current.value = null;
        } });
      }}>
        <div className="flex flex-col items-center gap-4 xs:flex-row">
          <div className="size-32 shrink-0 cursor-pointer" onClick={() => file.current.click()}>
            {file.current?.files.length ? <img ref={image} alt={title} loading="lazy" className="size-full rounded-full object-cover" /> : <div className="flex size-full items-center justify-center rounded-full border border-zinc-200 text-zinc-400">لوگو</div>}
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

                  setLogo(target.files[0]);
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
            <input
              type="text"
              value={englishTitle}
              placeholder="عنوان انگلیسی"
              className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
              onInput={({ target }) => setEnglishTitle(target.value)}
            />
          </div>
        </div>
        <button disabled={isPendingCreateCategory} className="mt-4 flex h-14 w-full items-center justify-center text-nowrap rounded-full bg-primary-900 text-white transition-colors enabled:hover:bg-primary-800">
          {isPendingCreateCategory ? <Loader width={"40px"} height={"10px"} color={"#ffffff"} /> : "ثبت"}
        </button>
      </form>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-vazirmatn-bold text-xl">دسته‌بندی‌ ها</h2>
        <span className="mr-auto text-zinc-500">{isFetchingCategories || isCategoriesError ? 0 : totalCategories.toLocaleString()} دسته‌بندی‌</span>
      </div>
      {isCategoriesError ? (
        <NoResultFound title="دسته‌بندی‌ای پیدا نشد!" className="mt-4" />
      ) : (
        <div className="mt-4 overflow-auto rounded-3xl border border-zinc-200">
          <table className="w-full text-nowrap text-lg">
            <thead className="bg-zinc-200">
              <tr className="[&>*]:h-[72px] [&>*]:px-5 [&>*]:font-vazirmatn-medium [&>*]:font-normal">
                <th>لوگو</th>
                <th>عنوان</th>
                <th>عنوان انگلیسی</th>
                <th></th>
              </tr>
            </thead>
            <InfiniteScroll hasNextPage={hasCategoriesNextPage} fetchNextPage={fetchCategoriesNextPage}>
              <tbody>
                {categories?.map((category) => <Category key={category._id} {...category} />)}
                {isFetchingCategories && Array(20).fill().map((category, index) => <CategorySkeleton key={index} />)}
              </tbody>
            </InfiniteScroll>
          </table>
        </div>
      )}
    </>
  );
};

export default Categories;