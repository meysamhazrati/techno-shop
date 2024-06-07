import { useState, useContext, useEffect } from "react";
import { ToastContext } from "../../contexts/Toast";
import useMe from "../../hooks/authentication/useMe";
import useCreateTicket from "../../hooks/ticket/useCreateTicket";
import Ticket from "../../components/me/Ticket";
import SelectBox from "../../components/SelectBox";
import NoResultFound from "../../components/NoResultFound";
import Loader from "../../components/Loader";

const Tickets = () => {
  const [department, setDepartment] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [departments, setDepartments] = useState([]);

  const { openToast } = useContext(ToastContext);

  const { me } = useMe();
  const { isPendingCreateTicket, createTicket } = useCreateTicket();

  useEffect(() => {
    document.title = "تکنوشاپ - من - تیکت ها";

    setDepartments([
      { title: "مدیریت", value: "Management" },
      { title: "مالی", value: "Finance" },
      { title: "پیگیری سفارش", value: "Order Tracking" },
      { title: "پشتیبانی", value: "Support" },
      { title: "بازخورد", value: "Feedback" },
      { title: "سایر", value: "Other" },
    ]);
  }, []);

  const submit = (event) => {
    event.preventDefault();

    if (departments.map(({ value }) => value).some((department_) => department_ === department?.trim())) {
      if (title.trim().length >= 2 && title.trim().length <= 20) {
        if (body.trim().length >= 5 && body.trim().length <= 300) {
          createTicket({ department: department.trim(), title: title.trim(), body: body.trim() }, { onSuccess: () => {
            setDepartment(null);
            setTitle("");
            setBody("");
          } });
        } else {
          openToast("error", null, "متن باید بین 5 تا 300 حروف باشد.");
        }
      } else {
        openToast("error", null, "عنوان باید بین 2 تا 20 حروف باشد.");
      }
    } else {
      openToast("error", null, "دپارتمان وارد شده معتبر نمی‌باشد.");
    }
  };

  return (
    <>
      <h6 className="font-vazirmatn-bold text-xl">ثبت تیکت جدید</h6>
      <form className="mt-4 text-lg" onSubmit={submit}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SelectBox title={"دپارتمان"} options={departments} currentValue={department} setValue={setDepartment} />
          <input
            type="text"
            value={title}
            placeholder="عنوان"
            className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
            onInput={({ target }) => setTitle(target.value)}
          />
        </div>
        <textarea
          type="text"
          value={body}
          placeholder="متن"
          className="mt-4 max-h-48 min-h-32 w-full rounded-3xl border border-zinc-200 p-4 text-lg outline-none placeholder:text-zinc-400"
          onInput={({ target }) => setBody(target.value)}
        />
        <button disabled={isPendingCreateTicket} className="mt-2 flex h-14 w-full items-center justify-center text-nowrap rounded-full bg-primary-900 text-white transition-colors enabled:hover:bg-primary-800">
          {isPendingCreateTicket ? <Loader width={"40px"} height={"10px"} color={"#ffffff"} /> : "ثبت"}
        </button>
      </form>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-vazirmatn-bold text-xl">تیکت ها</h2>
        <span className="mr-auto text-zinc-500">{me.tickets.length.toLocaleString()} تیکت</span>
      </div>
      {me.tickets.length !== 0 ? (
        <div className="mt-4 divide-y divide-zinc-200 overflow-hidden">
          {me.tickets.map((ticket) => <Ticket key={ticket._id} {...ticket} />)}
        </div>
      ) : (
        <NoResultFound title="تیکتی پیدا نشد!" className="mt-6" />
      )}
    </>
  );
};

export default Tickets;