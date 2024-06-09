import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import TomanIcon from "../../icons/TomanIcon";

const PriceFilter = ({ setPrice }) => {
  const [searchParams] = useSearchParams();
  const [minimum, setMinimum] = useState(0);
  const [maximum, setMaximum] = useState(1000000000);

  useEffect(() => {
    setMinimum((parseInt(searchParams.get("price")?.split("-")[0]) || 0) <= (parseInt(searchParams.get("price")?.split("-")[1]) || 1000000000) ? parseInt(searchParams.get("price")?.split("-")[0]) || 0 : parseInt(searchParams.get("price")?.split("-")[1]) || 1000000000);
    setMaximum((parseInt(searchParams.get("price")?.split("-")[1]) || 1000000000) >= (parseInt(searchParams.get("price")?.split("-")[0]) || 0) ? parseInt(searchParams.get("price")?.split("-")[1]) || 1000000000 : parseInt(searchParams.get("price")?.split("-")[0]) || 0);
  }, [searchParams]);

  return (
    <div className="py-4">
      <span className="text-xl">محدوده قیمت</span>
      <div className="mt-4 px-3 text-lg text-zinc-500">
        <div className="flex items-center justify-between gap-x-4">
          <span className="shrink-0">از</span>
          <input
            type="text"
            inputMode="numeric"
            value={minimum.toLocaleString()}
            className="w-full font-vazirmatn-medium text-zinc-900 outline-none"
            onInput={({ target }) => (parseInt(target.value.split(",").join("")) || 0) <= maximum && setMinimum(parseInt(target.value.split(",").join("")) || 0)}
            onBlur={() => minimum !== parseInt(searchParams.get("price")?.split("-")[0]) && setPrice([minimum, maximum])}
            style={{ direction: "ltr" }}
          />
          <TomanIcon className="size-6 shrink-0 fill-current" />
        </div>
        <div className="mt-3 flex items-center justify-between gap-x-4">
          <span className="shrink-0">تا</span>
          <input
            type="text"
            inputMode="numeric"
            value={maximum.toLocaleString()}
            className="w-full font-vazirmatn-medium text-zinc-900 outline-none"
            onInput={({ target }) => (parseInt(target.value.split(",").join("")) || minimum) >= minimum && (parseInt(target.value.split(",").join("")) || minimum) <= 1000000000 && setMaximum(parseInt(target.value.split(",").join("")) || minimum)}
            onBlur={() => maximum !== parseInt(searchParams.get("price")?.split("-")[1]) && setPrice([minimum, maximum])}
            style={{ direction: "ltr" }}
          />
          <TomanIcon className="size-6 shrink-0 fill-current" />
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;