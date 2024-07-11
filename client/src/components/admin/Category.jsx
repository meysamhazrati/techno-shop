import { useState, useRef } from "react";
import useUpdateCategory from "../../hooks/category/useUpdateCategory";
import useRemoveCategory from "../../hooks/category/useRemoveCategory";
import Modal from "../Modal";
import Confirm from "../Confirm";
import Loader from "../Loader";

const Category = ({ _id, title, englishTitle, logo }) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newEnglishTitle, setNewEnglishTitle] = useState(englishTitle);
  const [newLogo, setNewLogo] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const image = useRef();
  const file = useRef();

  const { isPendingUpdateCategory, updateCategory } = useUpdateCategory(_id);
  const { isPendingRemoveCategory, removeCategory } = useRemoveCategory(_id);

  return (
    <>
      <tr className="border-t border-zinc-200 [&>*]:h-[72px] [&>*]:px-5">
        <td>
          <img src={`${process.env.SERVER_URI}/images/categories/${logo}`} alt={title} loading="lazy" className="mx-auto size-12 rounded-full object-cover" />
        </td>
        <td>{title}</td>
        <td>{englishTitle}</td>
        <td>
          <div className="flex items-center justify-center gap-x-2 text-base">
            <button className="flex h-9 w-24 items-center justify-center rounded-full bg-zinc-500 text-white transition-colors hover:bg-zinc-400" onClick={() => setIsUpdateModalOpen(true)}>ویرایش</button>
            <button className="flex h-9 w-24 items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-400" onClick={() => setIsRemoveModalOpen(true)}>حذف</button>
          </div>
        </td>
      </tr>
      <Modal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)}>
        <h6 className="text-center font-vazirmatn-medium text-2xl">ویرایش دسته‌بندی‌</h6>
        <form className="mt-6 flex flex-col gap-y-3 text-lg xs:w-80 [&>*]:w-full" onSubmit={(event) => {
          event.preventDefault();
          
          updateCategory({ title: newTitle, englishTitle: newEnglishTitle, logo: newLogo }, { onSuccess: () => setIsUpdateModalOpen(false) });
        }}>
          <div className="mx-auto !size-32 shrink-0 cursor-pointer" onClick={() => file.current.click()}>
            <img ref={image} src={`${process.env.SERVER_URI}/images/categories/${logo}`} alt={title} loading="lazy" className="size-full rounded-full object-cover" />
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