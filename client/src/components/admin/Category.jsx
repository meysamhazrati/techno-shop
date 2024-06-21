import { useState, useRef, useContext } from "react";
import { ToastContext } from "../../contexts/Toast";
import useUpdateCategory from "../../hooks/category/useUpdateCategory";
import useRemoveCategory from "../../hooks/category/useRemoveCategory";
import Modal from "../Modal";
import Confirm from "../Confirm";
import Loader from "../Loader";

const Category = ({ _id, title, englishTitle, logo }) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newEnglishTitle, setNewEnglishTitle] = useState(englishTitle);
  const [newLogo, setNewLogo] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const image = useRef();
  const file = useRef();

  const { openToast } = useContext(ToastContext);

  const { isPendingUpdateCategory, updateCategory } = useUpdateCategory(_id);
  const { isPendingRemoveCategory, removeCategory } = useRemoveCategory(_id);

  const submit = (event) => {
    event.preventDefault();

    if (newTitle.trim().length >= 3 && newTitle.trim().length <= 50) {
      if (newEnglishTitle.trim().length >= 3 && newEnglishTitle.trim().length <= 50) {
        if (newLogo ? newLogo.type === "image/png" || newLogo.type === "image/jpg" || newLogo.type === "image/jpeg" : true) {
          updateCategory({ title: newTitle.trim(), englishTitle: newEnglishTitle.trim(), logo: newLogo }, { onSuccess: () => setIsEditModalOpen(false) });
        } else {
          openToast("error", null, "فرمت عکس باید PNG یا JPG یا JPEG باشد.");
        }
      } else {
        openToast("error", null, "عنوان انگلیسی باید بین 3 تا 50 حروف باشد.");
      }
    } else {
      openToast("error", null, "عنوان باید بین 3 تا 50 حروف باشد.");
    }
  };

  return (
    <>
      <tr className="border-t border-zinc-200 [&>*]:h-[72px] [&>*]:px-5">
        <td>
          <img src={`${process.env.SERVER_URI}/images/categories/${logo}`} alt="Category Logo" loading="lazy" className="size-12 rounded-full object-cover" />
        </td>
        <td>{title}</td>
        <td>{englishTitle}</td>
        <td>
          <div className="flex items-center justify-center gap-x-2 text-base">
            <button className="flex h-9 w-24 items-center justify-center rounded-full bg-zinc-500 text-white transition-colors hover:bg-zinc-400" onClick={() => setIsEditModalOpen(true)}>ویرایش</button>
            <button className="flex h-9 w-24 items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-400" onClick={() => setIsRemoveModalOpen(true)}>حذف</button>
          </div>
        </td>
      </tr>
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <h6 className="text-center font-vazirmatn-medium text-2xl">ویرایش دسته‌بندی‌</h6>
        <form className="mt-6 flex flex-col gap-y-3 text-lg xs:w-80 [&>*]:w-full" onSubmit={submit}>
          <div className="mx-auto !size-32 shrink-0 cursor-pointer" onClick={() => file.current.click()}>
            <img ref={image} src={`${process.env.SERVER_URI}/images/categories/${logo}`} alt="Category Logo" loading="lazy" className="size-full rounded-full object-cover" />
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
          <button disabled={isPendingUpdateCategory} className="flex h-14 w-full items-center justify-center text-nowrap rounded-full bg-primary-900 text-white transition-colors enabled:hover:bg-primary-800">
            {isPendingUpdateCategory ? <Loader width={"40px"} height={"10px"} color={"#ffffff"} /> : "ویرایش"}
          </button>
        </form>
      </Modal>
      <Modal isOpen={isRemoveModalOpen} onClose={() => setIsRemoveModalOpen(false)}>
        <Confirm title="این دسته‌بندی‌ را حذف می‌کنید؟" isPending={isPendingRemoveCategory} onCancel={() => setIsRemoveModalOpen(false)} onConfirm={() => removeCategory(null, { onSuccess: () => setIsRemoveModalOpen(false) })} />
      </Modal>
    </>
  );
};

export default Category;