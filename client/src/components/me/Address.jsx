import { useState, useRef, useContext } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Context as ToastContext } from "../../contexts/Toast";
import useUpdateAddress from "../../hooks/address/update";
import useRemoveAddress from "../../hooks/address/remove";
import Modal from "../Modal";
import Confirm from "../Confirm";
import Loader from "../Loader";
import PencilIcon from "../../icons/Pencil";
import TrashIcon from "../../icons/Trash";

const Address = ({ _id, province, city, postalCode, body }) => {
  const [newProvince, setNewProvince] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newPostalCode, setNewPostalCode] = useState("");
  const [newBody, setNewBody] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const editModal = useRef();
  const removeModal = useRef();

  const client = useQueryClient();

  const { openToast } = useContext(ToastContext);

  const { isPendingUpdateAddress, updateAddress } = useUpdateAddress(_id);
  const { isPendingRemoveAddress, removeAddress } = useRemoveAddress(_id);

  const closeModal = (modal, setIsOpen) => {
    const animationDuration = getComputedStyle(modal.current).getPropertyValue("transition-duration").slice(0, 3) * 1000;

    modal.current.style.visibility = "hidden";
    modal.current.style.opacity = "0%";

    document.body.classList.remove("overflow-hidden");

    setTimeout(() => setIsOpen(false), animationDuration);
  };

  return (
    <>
      <div className="py-4 text-lg first:pt-0 last:pb-0">
        <div className="flex items-center justify-between gap-x-10 overflow-auto">
          <div className="grid shrink-0 grid-cols-1 items-center gap-2 text-nowrap sm:flex sm:w-full sm:shrink sm:justify-between">
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">استان:</span>
              <span>{province}</span>
            </div>
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">شهر:</span>
              <span>{city}</span>
            </div>
            <div className="flex items-center gap-x-2">
              <span className="text-zinc-400">کدپستی:</span>
              <span>{postalCode}</span>
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <button className="flex size-11 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-zinc-200 hover:text-zinc-700" onClick={() => setIsEditModalOpen(true)}>
              <PencilIcon className="size-6" />
            </button>
            <button className="flex size-11 shrink-0 items-center justify-center rounded-full text-red-500 transition-colors enabled:hover:bg-red-100" onClick={() => setIsRemoveModalOpen(true)}>
              <TrashIcon className="size-6" />
            </button>
          </div>
        </div>
        <p className="mt-2">{body}</p>
      </div>
      {isEditModalOpen && (
        <Modal onClose={() => closeModal(editModal, setIsEditModalOpen)} ref={editModal}>
          <h6 className="text-center font-vazirmatn-medium text-2xl">ویرایش آدرس</h6>
          <form className="mt-6 flex flex-col gap-y-3 text-lg xs:w-80 [&>*]:w-full" onSubmit={(event) => {
            event.preventDefault();

            if (newProvince.trim().length >= 2 && newProvince.trim().length <= 20) {
              if (newCity.trim().length >= 2 && newCity.trim().length <= 20) {
                if (/\d{10}/.test(newPostalCode.trim())) {
                  if (newBody.trim().length >= 10 && newBody.trim().length <= 100) {
                    updateAddress({ province: newProvince.trim(), city: newCity.trim(), postalCode: newPostalCode.trim(), body: newBody.trim() }, { onSuccess: () => {
                      client.invalidateQueries({ queryKey: ["me"] });
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
          }}>
            <input
              type="text"
              value={newProvince}
              placeholder="استان"
              className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none"
              onInput={({ target }) => setNewProvince(target.value)}
            />
            <input
              type="text"
              value={newCity}
              placeholder="شهر"
              className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none"
              onInput={({ target }) => setNewCity(target.value)}
            />
            <input
              type="text"
              inputMode="numeric"
              value={newPostalCode}
              placeholder="کدپستی"
              className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none"
              onInput={({ target }) => /^\d{0,10}$/.test(target.value) && setNewPostalCode(target.value)}
            />
            <input
              type="text"
              value={newBody}
              placeholder="آدرس"
              className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none"
              onInput={({ target }) => setNewBody(target.value)}
            />
            <button disabled={isPendingUpdateAddress} className="flex h-14 w-full items-center justify-center text-nowrap rounded-full bg-primary-900 text-white transition-colors enabled:hover:bg-primary-800">
              {isPendingUpdateAddress ? <Loader width={"40px"} height={"10px"} color={"#ffffff"} /> : "ویرایش"}
            </button>
          </form>
        </Modal>
      )}
      {isRemoveModalOpen && (
        <Modal onClose={() => closeModal(removeModal, setIsRemoveModalOpen)} ref={removeModal}>
          <Confirm title="آیا میخواهید این آدرس را حذف کنید؟" isPending={isPendingRemoveAddress} onCancel={() => closeModal(removeModal, setIsRemoveModalOpen)} onConfirm={() => removeAddress(null, { onSuccess: () => {
            client.invalidateQueries({ queryKey: ["me"] });
            setIsRemoveModalOpen(false);
          }, })} />
        </Modal>
      )}
    </>
  );
};

export default Address;