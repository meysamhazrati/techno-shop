import { Link } from "react-router-dom";
import Section from "../../components/root/Section";
import HomeIcon from "../../icons/HomeIcon";
import ChevronIcon from "../../icons/ChevronIcon";

const Breadcrumb = ({ title, route, categoryTitle, categoryRoute }) => {
  return (
    <Section className="flex items-center gap-x-3 overflow-auto rounded-3xl bg-white px-6 py-5 text-lg [&>*]:shrink-0">
      <Link to="/" className="transition-colors hover:text-primary-900">
        <HomeIcon solid={true} className="size-6" />
      </Link>
      <ChevronIcon className="size-5 rotate-180" />
      <Link to={categoryRoute} className="transition-colors hover:text-primary-900">{categoryTitle}</Link>
      <ChevronIcon className="size-5 rotate-180" />
      <Link to={route} className="transition-colors hover:text-primary-900">{title}</Link>
    </Section>
  );
};

export default Breadcrumb;