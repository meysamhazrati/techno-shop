import { useState, useEffect } from "react";
import useDiscountCodes from "../../hooks/discountCode/useDiscountCodes";
import useCreateDiscountCode from "../../hooks/discountCode/useCreateDiscountCode";
import useCategories from "../../hooks/category/useCategories";
import InfiniteScroll from "../../components/InfiniteScroll";
import DiscountCode from "../../components/admin/DiscountCode";
import DiscountCodeSkeleton from "../../components/admin/DiscountCodeSkeleton";
import SelectBox from "../../components/SelectBox";
import NoResultFound from "../../components/NoResultFound";
import Loader from "../../components/Loader";

const DiscountCodes = () => {
  const [code, setCode] = useState("");
  const [percent, setPercent] = useState("");
  const [minimumPrice, setMinimumPrice] = useState("");
  const [maximumUsage, setMaximumUsage] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [categories_, setCategories_] = useState([]);

  const { isFetchingDiscountCodes, isDiscountCodesError, discountCodes, totalDiscountCodes, hasDiscountCodesNextPage, fetchDiscountCodesNextPage } = useDiscountCodes(20);
  const { isPendingCreateDiscountCode, createDiscountCode } = useCreateDiscountCode();
  const { categories } = useCategories();

  useEffect(() => {
    document.title = "تکنوشاپ - مدیریت - کد‌تخفیف ها";
  }, []);

  return (
    <>
      <h6 className="font-vazirmatn-bold text-xl">ثبت کد‌تخفیف جدید</h6>
      <form className="mt-4 text-lg" onSubmit={(event) => {
        event.preventDefault();

        createDiscountCode(Object.fromEntries(Object.entries({ code, percent, minimumPrice, maximumUsage, expiresAt, categories: categories_ }).filter(([key, value]) => value !== "" && (Array.isArray(value) ? value.length : true))), { onSuccess: () => {
          setCode("");
          setPercent("");
          setMinimumPrice("");
          setMaximumUsage("");
          setExpiresAt("");
          setCategories_([]);
        } });
      }}>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <input
            type="text"
            value={code}
            placeholder="کد"
            className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
            onInput={({ target }) => /^[a-zA-Z\d]{0,7}$/.test(target.value) && setCode(target.value)}
          />
          <input
            type="text"
            inputMode="numeric"
            value={percent}
            placeholder="درصد"
            className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
            onInput={({ target }) => /^\d*$/.test(target.value) && setPercent(target.value)}
          />
          <input
            type="text"
            inputMode="numeric"
            value={minimumPrice}
            placeholder="حداقل مبلغ"
            className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
            onInput={({ target }) => /^\d*$/.test(target.value) && setMinimumPrice(target.value)}
          />
          <input
            type="text"
            inputMode="numeric"
            value={maximumUsage}
            placeholder="حداکثر استفاده"
            className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
            onInput={({ target }) => /^\d*$/.test(target.value) && setMaximumUsage(target.value)}
          />
          <input
            type="text"
            inputMode="numeric"
            value={expiresAt}
            placeholder="انقضا (ساعت)"
            className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
            onInput={({ target }) => /^\d*$/.test(target.value) && setExpiresAt(target.value)}
          />
          <SelectBox
            title={"دسته‌بندی‌ ها"}
            options={categories?.map(({ _id, title }) => ({ title, value: _id })) || []}
            currentValues={categories_}
            setValues={setCategories_}
            multiple={true}
          />
        </div>
        <button disabled={isPendingCreateDiscountCode} className="mt-4 flex h-14 w-full items-center justify-center text-nowrap rounded-full bg-primary-900 text-white transition-colors enabled:hover:bg-primary-800">
          {isPendingCreateDiscountCode ? <Loader width={"40px"} height={"10px"} color={"#ffffff"} /> : "ثبت"}
        </button>
      </form>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-vazirmatn-bold text-xl">کد‌تخفیف ها</h2>
        <span className="mr-auto text-zinc-500">{isFetchingDiscountCodes || isDiscountCodesError ? 0 : totalDiscountCodes.toLocaleString()} کد‌تخفیف</span>
      </div>
      {isDiscountCodesError ? (
        <NoResultFound title="کد‌تخفیفی پیدا نشد!" className="mt-6" />
      ) : (
        <div className="mt-6 overflow-auto rounded-3xl border border-zinc-200">
          <table className="w-full text-nowrap text-lg">
            <thead className="bg-zinc-200">
              <tr className="[&>*]:h-[72px] [&>*]:px-5 [&>*]:font-vazirmatn-medium [&>*]:font-normal">
                <th>کد</th>
                <th>درصد</th>
                <th>حداقل مبلغ</th>
                <th>تعداد استفاده</th>
                <th>حداکثر استفاده</th>
                <th>سازنده</th>
                <th>تاریخ ثبت</th>
                <th>تاریخ انقضا</th>
                <th></th>
              </tr>
            </thead>
            <InfiniteScroll hasNextPage={hasDiscountCodesNextPage} fetchNextPage={fetchDiscountCodesNextPage}>
              <tbody>
                {discountCodes?.map((discountCode) => <DiscountCode key={discountCode._id} {...discountCode} />)}
                {isFetchingDiscountCodes && Array(20).fill().map((discountCode, index) => <DiscountCodeSkeleton key={index} />)}
              </tbody>
            </InfiniteScroll>
          </table>
        </div>
      )}
    </>
  );
};

export default DiscountCodes;