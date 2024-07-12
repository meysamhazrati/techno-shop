import { useState, useEffect } from "react";
import useMe from "../../hooks/authentication/useMe";
import useCreateAddress from "../../hooks/address/useCreateAddress";
import Address from "../../components/me/Address";
import NoResultFound from "../../components/NoResultFound";
import Loader from "../../components/Loader";

const Addresses = () => {
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [body, setBody] = useState("");

  const { me } = useMe();
  const { isPendingCreateAddress, createAddress } = useCreateAddress();

  useEffect(() => {
    document.title = "تکنوشاپ - من - آدرس ها";
  }, []);

  return (
    <>
      <h6 className="font-vazirmatn-bold text-xl">ثبت آدرس جدید</h6>
      <form className="mt-4 text-lg" onSubmit={(event) => {
        event.preventDefault();

        createAddress({ province, city, postalCode, body }, { onSuccess: () => {
          setProvince("");
          setCity("");
          setPostalCode("");
          setBody("");
        } });
      }} >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <input
            type="text"
            value={province}
            placeholder="استان"
            className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
            onInput={({ target }) => setProvince(target.value)}
          />
          <input
            type="text"
            value={city}
            placeholder="شهر"
            className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
            onInput={({ target }) => setCity(target.value)}
          />
          <input
            type="text"
            inputMode="numeric"
            value={postalCode}
            placeholder="کدپستی"
            className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
            onInput={({ target }) => /^\d{0,10}$/.test(target.value) && setPostalCode(target.value)}
          />
        </div>
        <textarea
          value={body}
          placeholder="متن"
          className="mt-4 max-h-48 min-h-32 w-full rounded-3xl border border-zinc-200 p-4 text-lg outline-none placeholder:text-zinc-400"
          onInput={({ target }) => setBody(target.value)}
        />
        <button disabled={isPendingCreateAddress} className="mt-2 flex h-14 w-full items-center justify-center text-nowrap rounded-full bg-primary-900 text-white transition-colors enabled:hover:bg-primary-800">
          {isPendingCreateAddress ? <Loader width={"40px"} height={"10px"} color={"#ffffff"} /> : "ثبت"}
        </button>
      </form>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-vazirmatn-bold text-xl">آدرس ها</h2>
        <span className="mr-auto text-zinc-500">{me.addresses.length.toLocaleString()} آدرس</span>
      </div>
      {me.addresses.length !== 0 ? (
        <div className="mt-4 divide-y divide-zinc-200 overflow-hidden">
          {me.addresses.map((address) => <Address key={address._id} {...address} />)}
        </div>
      ) : (
        <NoResultFound title="آدرسی پیدا نشد!" className="mt-4" />
      )}
    </>
  );
};

export default Addresses;