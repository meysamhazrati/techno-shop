import { useState, useRef, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContext } from "../../contexts/Toast";
import useUpdateUser from "../../hooks/user/useUpdateUser";
import useBanUser from "../../hooks/user/useBanUser";
import useUnBanUser from "../../hooks/user/useUnBanUser";
import useRemoveUser from "../../hooks/user/useRemoveUser";
import UserAvatar from "../UserAvatar";
import SelectBox from "../SelectBox";
import Modal from "../../components/Modal";
import Confirm from "../../components/Confirm";
import Loader from "../Loader";
import ChangeIcon from "../../icons/ChangeIcon";

const User = ({ _id, firstName, lastName, email, role, avatar, isBanned }) => {
  const [newFirstName, setNewFirstName] = useState(firstName);
  const [newLastName, setNewLastName] = useState(lastName);
  const [newEmail, setNewEmail] = useState(email);
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState(role);
  const [newAvatar, setNewAvatar] = useState(null);
  const [roles, setRoles] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isBanModalOpen, setIsBanModalOpen] = useState(false);
  const [isUnBanModalOpen, setIsUnBanModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const image = useRef();
  const file = useRef();

  const { openToast } = useContext(ToastContext);

  const { isPendingUpdateUser, updateUser } = useUpdateUser(_id);
  const { isPendingBanUser, banUser } = useBanUser(_id);
  const { isPendingUnBanUser, unBanUser } = useUnBanUser(_id);
  const { isPendingRemoveUser, removeUser } = useRemoveUser(_id);

  const submit = (event) => {
    event.preventDefault();

    if (newFirstName.trim().length >= 3 && newFirstName.trim().length <= 70) {
      if (newLastName.trim().length >= 4 && newLastName.trim().length <= 70) {
        if (newEmail.trim().length >= 10 && newEmail.trim().length <= 100 && /^\w+([.-]?\w)*@\w+([.-]?\w)*\.[a-zA-Z]{2,4}$/.test(newEmail.trim())) {
          if (newPassword ? /^[\w?!$._-]{8,20}$/.test(newPassword.trim()) : true) {
            if (roles.map(({ value }) => value).some((role) => role === newRole.trim())) {
              if (newAvatar ? (newAvatar.type === "image/png" || newAvatar.type === "image/jpg" || newAvatar.type === "image/jpeg") : true) {
                updateUser({ firstName: newFirstName.trim(), lastName: newLastName.trim(), email: newEmail.trim(), password: newPassword ? newPassword.trim() : undefined, role: newRole.trim(), avatar: newAvatar }, { onSuccess: () => {
                  setIsEditModalOpen(false);
                  setNewPassword("");
                }, });
              } else {
                openToast("error", null, "فرمت عکس باید PNG یا JPG یا JPEG باشد.");
              }
            } else {
              openToast("error", null, "نقش وارد شده معتبر نمی‌باشد.");
            }
          } else {
            openToast("error", null, "رمز عبور باید بین 8 تا 20 کاراکتر باشد.");
          }
        } else {
          openToast("error", null, "ایمیل وارد شده نامعتبر است.");
        }
      } else {
        openToast("error", null, "نام خانوادگی باید بین 4 تا 70 حروف باشد.");
      }
    } else {
      openToast("error", null, "نام باید بین 3 تا 70 حروف باشد.");
    }
  };

  useEffect(() => {
    setRoles([
      { title: "کاربر", value: "USER" },
      { title: "مدیر", value: "ADMIN" },
    ]);
  }, []);

  return (
    <>
      <tr className="border-t border-zinc-200 [&>*]:h-[72px] [&>*]:px-5">
        <td>
          <UserAvatar user={{ firstName, lastName, avatar }} className="size-12 text-base" />
        </td>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{email}</td>
        <td>{role === "ADMIN" ? "مدیر" : "کاربر"}</td>
        <td>{isBanned ? "ممنوع" : "آزاد"}</td>
        <td>
          <div className="flex items-center justify-between gap-x-2 text-base">
            <button className="flex h-9 w-24 items-center justify-center rounded-full bg-zinc-500 text-white transition-colors hover:bg-zinc-400" onClick={() => setIsEditModalOpen(true)}>ویرایش</button>
            {isBanned ? <button className="flex h-9 w-24 items-center justify-center rounded-full bg-yellow-400 text-white transition-colors hover:bg-yellow-300" onClick={() => setIsUnBanModalOpen(true)}>آزاد</button> : <button className="flex h-9 w-24 items-center justify-center rounded-full bg-yellow-400 text-white transition-colors hover:bg-yellow-300" onClick={() => setIsBanModalOpen(true)}>ممنوع</button>}
            <button className="flex h-9 w-24 items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-400" onClick={() => setIsRemoveModalOpen(true)}>حذف</button>
            <Link to={`/admin/users/${_id}`} className="flex h-9 w-24 items-center justify-center rounded-full bg-primary-900 text-white transition-colors hover:bg-primary-800">مشاهده</Link>
          </div>
        </td>
      </tr>
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <h6 className="text-center font-vazirmatn-medium text-2xl">ویرایش کاربر</h6>
        <form className="mt-6 flex flex-col gap-y-3 text-lg xs:w-80 [&>*]:w-full" onSubmit={submit}>
          <div className="relative mx-auto !size-32 shrink-0">
            {file.current?.files.length ? <img ref={image} alt="User Avatar" className="size-full rounded-full object-cover" /> : <UserAvatar user={{ firstName, lastName, avatar }} className="size-full text-3xl" />}
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

                  setNewAvatar(target.files[0]);
                }
              }}
            />
            <button type="button" className="absolute bottom-1 right-1 flex size-12 items-center justify-center rounded-full border-4 border-white bg-primary-900 text-white transition-colors hover:bg-primary-800" onClick={() => file.current.click()}>
              <ChangeIcon className="size-5" />
            </button>
          </div>
          <input
            type="text"
            value={newFirstName}
            placeholder="نام"
            className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
            onInput={({ target }) => setNewFirstName(target.value)}
          />
          <input
            type="text"
            value={newLastName}
            placeholder="نام خانوادگی"
            className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
            onInput={({ target }) => setNewLastName(target.value)}
          />
          <input
            type="text"
            inputMode="email"
            value={newEmail}
            placeholder="ایمیل"
            className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
            onInput={({ target }) => setNewEmail(target.value)}
          />
          <input
            type="password"
            value={newPassword}
            placeholder="رمز عبور"
            className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none placeholder:text-zinc-400"
            onInput={({ target }) => setNewPassword(target.value)}
          />
          <SelectBox title={"نقش"} options={roles} currentValue={newRole} setValue={setNewRole} />
          <button disabled={isPendingUpdateUser} className="flex h-14 w-full items-center justify-center text-nowrap rounded-full bg-primary-900 text-white transition-colors enabled:hover:bg-primary-800">
            {isPendingUpdateUser ? <Loader width={"40px"} height={"10px"} color={"#ffffff"} /> : "ویرایش"}
          </button>
        </form>
      </Modal>
      {isBanned ? (
        <Modal isOpen={isUnBanModalOpen} onClose={() => setIsUnBanModalOpen(false)}>
          <Confirm title="این کاربر را آزاد می‌کنید؟" isPending={isPendingUnBanUser} onCancel={() => setIsUnBanModalOpen(false)} onConfirm={() => unBanUser(null, { onSuccess: () => setIsUnBanModalOpen(false) })} />
        </Modal>
      ) : (
        <Modal isOpen={isBanModalOpen} onClose={() => setIsBanModalOpen(false)}>
          <Confirm title="این کاربر را ممنوع می‌کنید؟" isPending={isPendingBanUser} onCancel={() => setIsBanModalOpen(false)} onConfirm={() => banUser(null, { onSuccess: () => setIsBanModalOpen(false) })} />
        </Modal>
      )}
      <Modal isOpen={isRemoveModalOpen} onClose={() => setIsRemoveModalOpen(false)}>
        <Confirm title="این کاربر را حذف می‌کنید؟" isPending={isPendingRemoveUser} onCancel={() => setIsRemoveModalOpen(false)} onConfirm={() => removeUser(null, { onSuccess: () => setIsRemoveModalOpen(false) })} />
      </Modal>
    </>
  );
};

export default User;