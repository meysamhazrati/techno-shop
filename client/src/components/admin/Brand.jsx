import { useState, useRef } from "react";
import useUpdateBrand from "../../hooks/brand/useUpdateBrand";
import useRemoveBrand from "../../hooks/brand/useRemoveBrand";
import Modal from "../Modal";
import Confirm from "../Confirm";
import Loader from "../Loader";

const Brand = ({ _id, name, englishName, logo }) => {
  const [newName, setNewName] = useState(name);
  const [newEnglishName, setNewEnglishName] = useState(englishName);
  const [newLogo, setNewLogo] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const image = useRef();
  const file = useRef();

  const { isPendingUpdateBrand, updateBrand } = useUpdateBrand(_id);
  const { isPendingRemoveBrand, removeBrand } = useRemoveBrand(_id);

  return (
    <>
      <tr className="border-t border-zinc-200 [&>*]:h-[72px] [&>*]:px-5">
        <td>
          <img src={`${process.env.SERVER_URI}/images/brands/${logo}`} alt="Brand Logo" loading="lazy" className="size-12 rounded-full object-cover" />
        </td>
        <td>{name}</td>
        <td>{englishName}</td>
        <td>
          <div className="flex items-center justify-center gap-x-2 text-base">
            <button className="flex h-9 w-24 items-center justify-center rounded-full bg-zinc-500 text-white transition-colors hover:bg-zinc-400" onClick={() => setIsEditModalOpen(true)}>ویرایش</button>
            <button className="flex h-9 w-24 items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-400" onClick={() => setIsRemoveModalOpen(true)}>حذف</button>
          </div>
        </td>
      </tr>
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <h6 className="text-center font-vazirmatn-medium text-2xl">ویرایش برند</h6>
        <form className="mt-6 flex flex-col gap-y-3 text-lg xs:w-80 [&>*]:w-full" onSubmit={(event) => {
          event.preventDefault();

          updateBrand({ name: newName.trim(), englishName: newEnglishName.trim(), logo: newLogo }, { onSuccess: () => setIsEditModalOpen(false) })
        }}>
          <div className="mx-auto !size-32 shrink-0 cursor-pointer" onClick={() => file.current.click()}>
            <img ref={image} src={`${process.env.SERVER_URI}/images/brands/${logo}`} alt="Brand Logo" loading="lazy" className="size-full rounded-full object-cover" />
            <input
              ref={file}
              type="file"
              accept="image/png, image/jpg, image/jpeg"
              className="hidden"
              onChange={({ target }) => {
                if (target.files[0]) {
                  const reader = new FileReader();

                  reader.addEventListener("load", ({ target }) => (image.current.src = target.result));

                  reader.readAsDataURL(target.files[0]);

                  setNewLogo(target.files[0]);
                }
              }}
            />
          </div>
          <input
            type="text"
            value={newName}
            placeholder="نام"
            className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
            onInput={({ target }) => setNewName(target.value)}
          />
          <input
            type="text"
            value={newEnglishName}
            placeholder="نام انگلیسی"
            className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
            onInput={({ target }) => setNewEnglishName(target.value)}
          />
          <button disabled={isPendingUpdateBrand} className="flex h-14 w-full items-center justify-center text-nowrap rounded-full bg-primary-900 text-white transition-colors enabled:hover:bg-primary-800">
            {isPendingUpdateBrand ? <Loader width={"40px"} height={"10px"} color={"#ffffff"} /> : "ویرایش"}
          </button>
        </form>
      </Modal>
      <Modal isOpen={isRemoveModalOpen} onClose={() => setIsRemoveModalOpen(false)}>
        <Confirm title="این برند را حذف می‌کنید؟" isPending={isPendingRemoveBrand} onCancel={() => setIsRemoveModalOpen(false)} onConfirm={() => removeBrand(null, { onSuccess: () => setIsRemoveModalOpen(false) })} />
      </Modal>
    </>
  );
};

export default Brand;