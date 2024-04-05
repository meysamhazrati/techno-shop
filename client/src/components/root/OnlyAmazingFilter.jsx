import { useSearchParams } from "react-router-dom";

const OnlyAmazingFilter = ({ setOnlyAmazing }) => {
  const [searchParams] = useSearchParams();

  return (
    <div className="flex w-full items-center justify-between py-4">
      <span className="text-xl">فقط کالاهای شگفت‌انگیز</span>
      <input
        type="checkbox"
        checked={JSON.parse(searchParams.get("only-amazing")) || false}
        className="relative h-6 w-12 cursor-pointer appearance-none rounded-full bg-zinc-200 transition-colors before:absolute before:bottom-0 before:right-1 before:top-0 before:my-auto before:size-4 before:rounded-full before:bg-white before:transition-all checked:bg-primary-900 checked:before:right-7"
        onChange={() => setOnlyAmazing((onlyAmazing) => !onlyAmazing)}
      />
    </div>
  );
};

export default OnlyAmazingFilter;