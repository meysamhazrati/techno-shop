import { useState } from "react";
import { Link } from "react-router-dom";
import useUpdateOffer from "../../hooks/offer/useUpdateOffer";
import useRemoveOffer from "../../hooks/offer/useRemoveOffer";
import Modal from "../Modal";
import Confirm from "../Confirm";
import Loader from "../Loader";

const Offer = ({ _id, title, englishTitle, description, percent, organizer, expiresAt, createdAt }) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newEnglishTitle, setNewEnglishTitle] = useState(englishTitle);
  const [newDescription, setNewDescription] = useState(description);
  const [newPercent, setNewPercent] = useState(percent.toString());
  const [newExpiresAt, setNewExpiresAt] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const { isPendingUpdateOffer, updateOffer } = useUpdateOffer(_id);
  const { isPendingRemoveOffer, removeOffer } = useRemoveOffer(_id);

  return (
    <>
      <tr className="border-t border-zinc-200 [&>*]:h-[72px] [&>*]:px-5">
        <td>{title}</td>
        <td>{englishTitle}</td>
        <td>{description}</td>
        <td>{percent} درصد</td>
        <td>
          <Link to={`/admin/users/${organizer._id}`} className="text-primary-900">{organizer.firstName} {organizer.lastName}</Link>
        </td>
        <td>{new Intl.DateTimeFormat("fa", { dateStyle: "medium" }).format(Date.parse(createdAt))}</td>
        <td>{new Intl.DateTimeFormat("fa", { dateStyle: "medium" }).format(Date.parse(expiresAt))}</td>
        <td>
          <div className="flex items-center justify-center gap-x-2 text-base">
            <button className="flex h-9 w-24 items-center justify-center rounded-full bg-zinc-500 text-white transition-colors hover:bg-zinc-400" onClick={() => setIsEditModalOpen(true)}>ویرایش</button>
            <button className="flex h-9 w-24 items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-400" onClick={() => setIsRemoveModalOpen(true)}>حذف</button>
          </div>
        </td>
      </tr>
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <h6 className="text-center font-vazirmatn-medium text-2xl">ویرایش پیشنهاد</h6>
        <form className="mt-6 flex flex-col gap-y-3 text-lg xs:w-80 [&>*]:w-full" onSubmit={(event) => {
          event.preventDefault();

          updateOffer(Object.fromEntries(Object.entries({ title: newTitle?.trim(), englishTitle: newEnglishTitle?.trim(), description: newDescription?.trim(), percent: newPercent?.trim(), expiresAt: newExpiresAt?.trim() }).filter(([key, value]) => value !== "")), { onSuccess: () => setIsEditModalOpen(false) });
        }}>
          <input
            type="text"
            value={newTitle}
            placeholder="عنوان"
            className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
            onInput={({ target }) => setNewTitle(target.value)}
          />
          <input
            type="text"
            value={newEnglishTitle}
            placeholder="عنوان انگلیسی"
            className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
            onInput={({ target }) => setNewEnglishTitle(target.value)}
          />
          <input
            type="text"
            inputMode="numeric"
            value={newPercent}
            placeholder="درصد"
            className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
            onInput={({ target }) => /^\d*$/.test(target.value) && setNewPercent(target.value)}
          />
          <input
            type="text"
            inputMode="numeric"
            value={newExpiresAt}
            placeholder="انقضا (ساعت)"
            className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
            onInput={({ target }) => /^\d*$/.test(target.value) && setNewExpiresAt(target.value)}
          />
          <textarea
            value={newDescription}
            placeholder="توضیحات"
            className="max-h-48 min-h-32 rounded-3xl border border-zinc-200 p-4 text-lg outline-none placeholder:text-zinc-400"
            onInput={({ target }) => setNewDescription(target.value)}
          />
          <button disabled={isPendingUpdateOffer} className="flex h-14 w-full items-center justify-center text-nowrap rounded-full bg-primary-900 text-white transition-colors enabled:hover:bg-primary-800">
            {isPendingUpdateOffer ? <Loader width={"40px"} height={"10px"} color={"#ffffff"} /> : "ویرایش"}
          </button>
        </form>
      </Modal>
      <Modal isOpen={isRemoveModalOpen} onClose={() => setIsRemoveModalOpen(false)}>
        <Confirm title="این پیشنهاد را حذف می‌کنید؟" isPending={isPendingRemoveOffer} onCancel={() => setIsRemoveModalOpen(false)} onConfirm={() => removeOffer(null, { onSuccess: () => setIsRemoveModalOpen(false) })} />
      </Modal>
    </>
  );
};

export default Offer;