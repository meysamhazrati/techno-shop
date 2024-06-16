const UserAvatar = ({ user, className }) => {
  return (
    <div className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full ${user.avatar ? "bg-white" : "bg-primary-900 text-white"} ${className || ""}`}>
      {user.avatar ? <img src={`${process.env.SERVER_URI}/images/users/${user.avatar}`} alt="User Avatar" className="size-full object-cover" /> : <span>{user.firstName[0]} {user.lastName[0]}</span>}
    </div>
  );
};

export default UserAvatar;