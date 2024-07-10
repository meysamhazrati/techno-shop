import { useState, useEffect } from "react";
import useOffers from "../../hooks/offer/useOffers";
import useCreateOffer from "../../hooks/offer/useCreateOffer";
import useCategories from "../../hooks/category/useCategories";
import InfiniteScroll from "../../components/InfiniteScroll";
import Offer from "../../components/admin/Offer";
import OfferSkeleton from "../../components/admin/OfferSkeleton";
import SelectBox from "../../components/SelectBox";
import NoResultFound from "../../components/NoResultFound";
import Loader from "../../components/Loader";

const Offers = () => {
  const [title, setTitle] = useState("");
  const [englishTitle, setEnglishTitle] = useState("");
  const [description, setDescription] = useState("");
  const [percent, setPercent] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [categories_, setCategories_] = useState([]);

  const { isFetchingOffers, isOffersError, offers, total, hasOffersNextPage, fetchOffersNextPage } = useOffers(20);
  const { isPendingCreateOffer, createOffer } = useCreateOffer();
  const { categories } = useCategories();

  useEffect(() => {
    document.title = "تکنوشاپ - مدیریت - پیشنهاد ها";
  }, []);

  return (
    <>
      <h6 className="font-vazirmatn-bold text-xl">ثبت پیشنهاد جدید</h6>
      <form className="mt-4 text-lg" onSubmit={(event) => {
        event.preventDefault();

        createOffer(Object.fromEntries(Object.entries({ title: title?.trim(), englishTitle: englishTitle?.trim(), description: description?.trim(), percent: percent?.trim(), expiresAt: expiresAt?.trim(), categories: categories_ }).filter(([key, value]) => value !== "" && (Array.isArray(value) ? value.length : true))), { onSuccess: () => {
          setTitle("");
          setEnglishTitle("");
          setDescription("");
          setPercent("");
          setExpiresAt("");
          setCategories_([]);
        } });
      }}>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
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
        <textarea
          value={description}
          placeholder="توضیحات"
          className="mt-4 max-h-48 min-h-32 w-full rounded-3xl border border-zinc-200 p-4 text-lg outline-none placeholder:text-zinc-400"
          onInput={({ target }) => setDescription(target.value)}
        />
        <button disabled={isPendingCreateOffer} className="mt-4 flex h-14 w-full items-center justify-center text-nowrap rounded-full bg-primary-900 text-white transition-colors enabled:hover:bg-primary-800">
          {isPendingCreateOffer ? <Loader width={"40px"} height={"10px"} color={"#ffffff"} /> : "ثبت"}
        </button>
      </form>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-vazirmatn-bold text-xl">پیشنهاد ها</h2>
        <span className="mr-auto text-zinc-500">{isFetchingOffers || isOffersError ? 0 : total.toLocaleString()} پیشنهاد</span>
      </div>
      {isOffersError ? (
        <NoResultFound title="پیشنهادی پیدا نشد!" className="mt-6" />
      ) : (
        <div className="mt-6 overflow-auto rounded-3xl border border-zinc-200">
          <table className="w-full text-nowrap text-lg">
            <thead className="bg-zinc-200">
              <tr className="[&>*]:h-[72px] [&>*]:px-5 [&>*]:font-vazirmatn-medium [&>*]:font-normal">
                <th>عنوان</th>
                <th>عنوان انگلیسی</th>
                <th>توضیحات</th>
                <th>درصد</th>
                <th>برگزار‌کننده</th>
                <th>تاریخ برگزاری</th>
                <th>تاریخ انقضا</th>
                <th></th>
              </tr>
            </thead>
            <InfiniteScroll hasNextPage={hasOffersNextPage} fetchNextPage={fetchOffersNextPage}>
              <tbody>
                {offers?.map((offer) => <Offer key={offer._id} {...offer} />)}
                {isFetchingOffers && Array(20).fill().map((offer, index) => <OfferSkeleton key={index} />)}
              </tbody>
            </InfiniteScroll>
          </table>
        </div>
      )}
    </>
  );
};

export default Offers;