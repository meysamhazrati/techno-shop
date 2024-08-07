import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import useMe from "../../hooks/authentication/useMe";
import useEditUser from "../../hooks/user/useEditUser";
import UserAvatar from "../../components/UserAvatar";
import Loader from "../../components/Loader";
import ChangeIcon from "../../icons/ChangeIcon";

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [avatar, setAvatar] = useState(null);

  const image = useRef();
  const file = useRef();

  const { me } = useMe();
  const { isPendingEditUser, editUser } = useEditUser();

  useEffect(() => {
    document.title = "تکنوشاپ - من - نمایه";
  }, []);

  useEffect(() => {
    setFirstName(me.firstName);
    setLastName(me.lastName);
    setEmail(me.email);
  }, [me]);

  return (
    <>
      <form onSubmit={(event) => {
        event.preventDefault();

        editUser({ firstName, lastName, currentPassword: currentPassword || undefined, newPassword: newPassword || undefined, avatar }, { onSuccess: () => {
          setCurrentPassword("");
          setNewPassword("");
        } });
      }}>
        <div className="flex flex-col items-center gap-6 sm:flex-row">
          <div className="relative size-52 shrink-0">
            {file.current?.files.length ? <img ref={image} alt={`${me.firstName} ${me.lastName}`} className="size-full rounded-full object-cover" /> : <UserAvatar user={me} className="size-full text-5xl" />}
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

                  setAvatar(target.files[0]);
                }
              }}
            />
            <button type="button" className="absolute bottom-1 right-1 flex size-14 items-center justify-center rounded-full border-4 border-white bg-primary-900 text-white transition-colors hover:bg-primary-800" onClick={() => file.current.click()}>
              <ChangeIcon className="size-6" />
            </button>
          </div>
          <div className="flex w-full flex-col gap-y-6">
            <div className="flex flex-col gap-y-3">
              <label className="text-zinc-400">نام</label>
              <input
                type="text"
                value={firstName}
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none"
                onInput={({ target }) => setFirstName(target.value)}
              />
            </div>
            <div className="flex flex-col gap-y-3">
              <label className="text-zinc-400">نام خانوادگی</label>
              <input
                type="text"
                value={lastName}
                className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none"
                onInput={({ target }) => setLastName(target.value)}
              />
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div className="flex flex-col gap-y-3">
            <label className="text-zinc-400">ایمیل</label>
            <input
              type="text"
              inputMode="email"
              value={email}
              disabled={true}
              className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none disabled:bg-white"
            />
          </div>
          <div className="mt-6">
            <div className="flex flex-col items-center gap-6 sm:flex-row">
              <div className="flex w-full flex-col gap-y-3 sm:flex-1">
                <label className="text-zinc-400">رمز عبور فعلی</label>
                <input
                  type="password"
                  value={currentPassword}
                  className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none"
                  onInput={({ target }) => setCurrentPassword(target.value)}
                />
              </div>
              <div className="flex w-full flex-col gap-y-3 sm:flex-1">
                <label className="text-zinc-400">رمز عبور جدید</label>
                <input
                  type="password"
                  value={newPassword}
                  className="h-14 rounded-3xl border border-zinc-200 px-4 text-lg outline-none"
                  onInput={({ target }) => setNewPassword(target.value)}
                />
              </div>
            </div>
            <Link to="/authentication/reset-password" className="mt-3 inline-block text-zinc-400 transition-colors hover:text-primary-900">رمز عبور خود را فراموش کردید؟</Link>
          </div>
        </div>
        <button type="submit" disabled={isPendingEditUser} className="mt-6 flex h-14 w-full items-center justify-center rounded-full bg-primary-900 text-lg text-white transition-colors enabled:hover:bg-primary-800">
          {isPendingEditUser ? <Loader width={"40px"} height={"10px"} color={"#ffffff"} /> : "ثبت اطلاعات"}
        </button>
      </form>
    </>
  );
};

export default Profile;