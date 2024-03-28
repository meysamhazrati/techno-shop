import withToast from "../hocs/Toast";

const Error = withToast(({ title, description, width }) => {
  return (
    <>
      <div className="flex size-full items-center gap-x-3 lg:gap-x-5">
        <div className="flex size-10 items-center justify-center rounded-full text-white lg:size-11" style={{ backgroundColor: "#dc2626" }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="4" stroke="currentColor" className="size-5 lg:size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>
        <div>
          <h4 className="font-vazirmatn-bold text-base lg:text-lg">{title || "خطا!"}</h4>
          <p className="text-sm text-zinc-400 lg:text-base">{description || "مشکلی پیش آمد! لطفا بعدا دوباره تلاش کنید."}</p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 mx-auto h-[3px] w-full rounded lg:h-1" style={{ width: `${width}%`, backgroundColor: "#dc2626" }}></div>
    </>
  );
});

export default Error;