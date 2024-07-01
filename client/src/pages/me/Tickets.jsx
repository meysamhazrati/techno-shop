import { useState, useEffect } from "react";
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

  const { me } = useMe();
  const { isPendingCreateTicket, createTicket } = useCreateTicket();

  useEffect(() => {
    document.title = "تکنوشاپ - من - تیکت ها";
  }, []);

  return (
    <>
      <h6 className="font-vazirmatn-bold text-xl">ثبت تیکت جدید</h6>
      <form className="mt-4 text-lg" onSubmit={(event) => {
        event.preventDefault();

        createTicket({ department: department.trim(), title: title.trim(), body: body.trim() }, { onSuccess: () => {
          setDepartment(null);
          setTitle("");
          setBody("");
        } });
      }}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SelectBox
            title={"دپارتمان"}
            options={[
              { title: "مدیریت", value: "مدیریت" },
              { title: "مالی", value: "مالی" },
              { title: "پیگیری سفارش", value: "پیگیری سفارش" },
              { title: "پشتیبانی", value: "پشتیبانی" },
              { title: "بازخورد", value: "بازخورد" },
              { title: "سایر", value: "سایر" },
            ]}
            currentValue={department}
            setValue={setDepartment}
          />
          <input
            type="text"
            value={title}
            placeholder="عنوان"
            className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
            onInput={({ target }) => setTitle(target.value)}
          />
        </div>
        <textarea
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