import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { ToastContext } from "../../contexts/Toast";
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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPendingUpdateAddress, updateAddress } = useUpdateAddress(_id);
  const { isPendingRemoveAddress, removeAddress } = useRemoveAddress(_id);

  const submit = (event) => {
    event.preventDefault();

    if (newProvince.trim().length >= 2 && newProvince.trim().length <= 20) {
      if (newCity.trim().length >= 2 && newCity.trim().length <= 20) {
        if (/\d{10}/.test(newPostalCode.trim())) {
          if (newBody.trim().length >= 10 && newBody.trim().length <= 100) {
            updateAddress({ province: newProvince.trim(), city: newCity.trim(), postalCode: newPostalCode.trim(), body: newBody.trim() }, { onSuccess: () => {
              client.invalidateQueries([{ queryKey: ["addresses"] }, { queryKey: ["users", { id: recipient._id || recipient }] }]);
              setIsEditModalOpen(false);
            } });
          } else {
            openToast("error", null, "آدرس باید بین 10 تا 100 حروف باشد.");
          }
        } else {
          openToast("error", null, "کدپستی معتبر نمی‌باشد.");
        }
      } else {
        openToast("error", null, "شهر باید بین 2 تا 20 حروف باشد.");
      }
    } else {
      openToast("error", null, "استان باید بین 2 تا 20 حروف باشد.");
    }
  };

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
            <button className="flex h-9 w-24 items-center justify-center rounded-full bg-zinc-500 text-white transition-colors hover:bg-zinc-400" onClick={() => setIsEditModalOpen(true)}>ویرایش</button>
            <button className="flex h-9 w-24 items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-400" onClick={() => setIsRemoveModalOpen(true)}>حذف</button>
            <button className="flex h-9 w-24 items-center justify-center rounded-full bg-primary-900 text-white transition-colors hover:bg-primary-800" onClick={() => setIsAddressModalOpen(true)}>مشاهده</button>
          </div>
        </td>
      </tr>
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <h6 className="text-center font-vazirmatn-medium text-2xl">ویرایش آدرس</h6>
        <form className="mt-6 flex flex-col gap-y-3 text-lg xs:w-80 [&>*]:w-full" onSubmit={submit}>
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
            onInput={({ target }) =>
              /^\d{0,10}$/.test(target.value) && setNewPostalCode(target.value)
            }
          />
          <textarea
            type="text"
            value={newBody}
            placeholder="آدرس"
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