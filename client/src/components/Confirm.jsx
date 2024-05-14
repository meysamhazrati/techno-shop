import Loader from "./Loader";

const Confirm = ({ title, isPending, onCancel, onConfirm }) => {
  return (
    <>
      <h6 className="text-center font-vazirmatn-medium text-2xl">{title}</h6>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 text-xl xs:flex-row">
        <button className="h-14 w-full rounded-full bg-zinc-200 text-zinc-700 xs:w-32" onClick={onCancel}>لغو</button>
        <button disabled={isPending} className="flex h-14 w-full items-center justify-center rounded-full bg-primary-900 text-white transition-colors enabled:hover:bg-primary-800 xs:w-32" onClick={onConfirm}>
          {isPending ? <Loader width={"40px"} height={"10px"} color={"#ffffff"} /> : "تایید"}
        </button>
      </div>
    </>
  );
};

export default Confirm;