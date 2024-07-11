import { useState } from "react";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import useUpdateAddress from "../../hooks/address/useUpdateAddress";
import useRemoveAddress from "../../hooks/address/useRemoveAddress";
import Modal from "../Modal";
import Confirm from "../Confirm";
import Loader from "../Loader";

const Address = ({ _id, province, city, postalCode, body, recipient }) => {
  const [newProvince, setNewProvince] = useState(province);
  const [newCity, setNewCity] = useState(city);
  const [newPostalCode, setNewPostalCode] = useState(postalCode);
  const [newBody, setNewBody] = useState(body);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const client = useQueryClient();

  const { isPendingUpdateAddress, updateAddress } = useUpdateAddress(_id);
  const { isPendingRemoveAddress, removeAddress } = useRemoveAddress(_id);

  return (
    <>
      <tr className="border-t border-zinc-200 [&>*]:h-[72px] [&>*]:px-5">
        <td>{province}</td>
        <td>{city}</td>
        <td>{postalCode}</td>
        {recipient.firstName && recipient.lastName && (
          <td>
            <Link to={`/admin/users/${recipient._id}`} className="text-primary-900">{recipient.firstName} {recipient.lastName}</Link>
          </td>
        )}
        <td>
          <div className="flex items-center justify-center gap-x-2 text-base">
            <button className="flex h-9 w-24 items-center justify-center rounded-full bg-zinc-500 text-white transition-colors hover:bg-zinc-400" onClick={() => setIsUpdateModalOpen(true)}>ویرایش</button>
            <button className="flex h-9 w-24 items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-400" onClick={() => setIsRemoveModalOpen(true)}>حذف</button>
            <button className="flex h-9 w-24 items-center justify-center rounded-full bg-primary-900 text-white transition-colors hover:bg-primary-800" onClick={() => setIsAddressModalOpen(true)}>مشاهده</button>
          </div>
        </td>
      </tr>
      <Modal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)}>
        <h6 className="text-center font-vazirmatn-medium text-2xl">ویرایش آدرس</h6>
        <form className="mt-6 flex flex-col gap-y-3 text-lg xs:w-80 [&>*]:w-full" onSubmit={(event) => {
          event.preventDefault();

          updateAddress({ province: newProvince, city: newCity, postalCode: newPostalCode, body: newBody }, { onSuccess: () => {
            client.invalidateQueries([{ queryKey: ["addresses"] }, { queryKey: ["users", { id: recipient._id || recipient }] }]);
            setIsUpdateModalOpen(false);
          } });
        }}>
          <input
            type="text"
            value={newProvince}
            placeholder="استان"
            className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
            onInput={({ target }) => setNewProvince(target.value)}
          />
          <input
            type="text"
            value={newCity}
            placeholder="شهر"
            className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
            onInput={({ target }) => setNewCity(target.value)}
          />
          <input
            type="text"
            inputMode="numeric"
            value={newPostalCode}
            placeholder="کدپستی"
            className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
            onInput={({ target }) => /^\d{0,10}$/.test(target.value) && setNewPostalCode(target.value)}
          />
          <textarea
            value={newBody}
            placeholder="متن"
            className="max-h-48 min-h-32 rounded-3xl border border-zinc-200 p-4 text-lg outline-none placeholder:text-zinc-400"
            onInput={({ target }) => setNewBody(target.value)}
          />
          <button disabled={isPendingUpdateAddress} className="flex h-14 w-full items-center justify-center text-nowrap rounded-full bg-primary-900 text-white transition-colors enabled:hover:bg-primary-800">
            {isPendingUpdateAddress ? <Loader width={"40px"} height={"10px"} color={"#ffffff"} /> : "ویرایش"}
          </button>
        </form>
      </Modal>
      <Modal isOpen={isRemoveModalOpen} onClose={() => setIsRemoveModalOpen(false)}>
        <Confirm title="این آدرس را حذف می‌کنید؟" isPending={isPendingRemoveAddress} onCancel={() => setIsRemoveModalOpen(false)} onConfirm={() => removeAddress(null, { onSuccess: () => {
          client.invalidateQueries([{ queryKey: ["addresses"] }, { queryKey: ["users", { id: recipient._id || recipient }] }]);
          setIsRemoveModalOpen(false);
        } })} />
      </Modal>
      <Modal isOpen={isAddressModalOpen} onClose={() => setIsAddressModalOpen(false)}>
        <h6 className="text-center font-vazirmatn-medium text-2xl">آدرس</h6>
        <p className="mt-6 min-w-64 max-w-80 text-lg">{body}</p>
      </Modal>
    </>
  );
};

export default Address;