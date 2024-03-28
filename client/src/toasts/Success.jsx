import withToast from "../hocs/Toast";

const Success = withToast(({ title, description, width }) => {
  return (
    <>
      <div className="flex size-full items-center gap-x-3 lg:gap-x-5">
        <div className="flex size-10 items-center justify-center rounded-full text-white lg:size-11" style={{ backgroundColor: "#16a34a" }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="4" stroke="currentColor" className="size-5 lg:size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>
        <div>
          <h4 className="font-vazirmatn-bold text-base lg:text-lg">{title || "موفق!"}</h4>
          <p className="text-sm text-zinc-400 lg:text-base">{description || "درخواست شما با موفقیت انجام شد."}</p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 mx-auto h-[3px] w-full rounded lg:h-1" style={{ width: `${width}%`, backgroundColor: "#16a34a" }}></div>
    </>
  );
});

export default Success;