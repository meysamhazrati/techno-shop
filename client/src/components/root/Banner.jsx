import { Link } from "react-router-dom";

const Banner = ({ image, title, subTitle, to }) => {
  return (
    <Link to={to} className="relative flex h-44 items-center overflow-hidden rounded-3xl bg-cover bg-center md:h-60" style={{ backgroundImage: `linear-gradient(to left, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1)), url("/images/banners/${image}")` }}>
      <div className="absolute z-10 px-5 text-white lg:px-10">
        <h6 className="font-vazirmatn-medium text-2xl lg:text-3xl">{title}</h6>
        <span className="mt-1 block text-lg lg:mt-2 lg:text-xl">{subTitle}</span>
      </div>
    </Link>
  );
};

export default Banner;