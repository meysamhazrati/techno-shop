import { Link } from "react-router-dom";
import ChevronIcon from "../../icons/ChevronIcon";

const SectionHeader = ({ title, condition, button, route, navigation, children }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h2 className="font-vazirmatn-bold text-3xl">{title}</h2>
      {condition && (button ? (
        <Link to={route} className="mr-auto flex h-12 w-40 items-center justify-center gap-x-2 rounded-full font-vazirmatn-medium text-primary-900 transition-colors hover:bg-primary-50">
          <span className="text-lg">مشاهده همه</span>
          <ChevronIcon className="size-5 rotate-180" />
        </Link>
      ) : navigation ? (
        <div className="mr-auto flex items-center gap-x-3 text-primary-900">
          <button className="swiper-button-prev flex size-12 items-center justify-center rounded-full border border-primary-900 transition-colors hover:bg-primary-50">
            <ChevronIcon className="size-6" />
          </button>
          <button className="swiper-button-next flex size-12 items-center justify-center rounded-full border border-primary-900 transition-colors hover:bg-primary-50">
            <ChevronIcon className="size-6 rotate-180" />
          </button>
        </div>
      ) : (
        children
      ))}
    </div>
  );
};

export default SectionHeader;