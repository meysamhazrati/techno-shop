import { Link } from "react-router-dom";
import useCategories from "../../hooks/category/categories";
import DoubleChevronUpIcon from "../../icons/DoubleChevronUp";
import technoShop from "/techno-shop.svg";

const Footer = () => {
  const { categories } = useCategories(7);

  return (
    <footer className="mt-12 hidden w-full bg-white px-7 py-5 lg:block">
      <div className="flex items-center justify-between">
        <div>
          <img src={technoShop} alt="Techno Shop" />
          <div className="mt-3 flex items-center gap-x-3 [&>a]:transition-colors hover:[&>a]:text-primary-900">
            <Link to="tel:021-70000710">021-70000710</Link>
            <span className="h-3.5 w-px bg-zinc-900"></span>
            <Link to="mailto:technoooshop@gmail.com">technoooshop@gmail.com</Link>
          </div>
        </div>
        <div>
          <button className="flex size-12 items-center justify-center rounded-full transition-colors hover:bg-zinc-200 hover:text-zinc-700" onClick={() => window.scrollTo(0, 0)}>
            <DoubleChevronUpIcon className="size-7 transition-colors" />
          </button>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-[360px_1fr_1fr_1fr] xl:grid-cols-4 xl:gap-x-10">
        <div>
          <h5 className="font-vazirmatn-medium text-lg">با ما به دنیای تکنولوژی سفر کنید!</h5>
          <p className="mt-3 max-w-72 leading-[28.5px] text-zinc-500">تکنوشاپ یک فروشگاه آنلاین کالای دیجیتال با تنوع محصول بسیاری از جمله موبایل، لپ‌تاپ، کامپیوتر و... هست که در عصر تکنولوژی امروزی، همه ما به آن ها نیاز داریم.</p>
        </div>
        <div>
          <h5 className="font-vazirmatn-medium text-lg">خدمات مشتریان</h5>
          <div className="mt-3 flex flex-col items-start gap-y-1.5 text-zinc-500 [&>*]:transition-colors hover:[&>*]:text-primary-900">
            <Link to="/privacy">حریم خصوصی</Link>
            <Link to="/terms-and-conditions">قوانین و مقررات</Link>
            <Link to="/me/frequently-asked-questions">پرسش های متداول</Link>
            <Link to="/me/tickets">ارتباط با ما</Link>
          </div>
        </div>
        <div>
          <h5 className="font-vazirmatn-medium text-lg">دسترسی سریع</h5>
          <div className="mt-3 flex flex-col items-start gap-y-1.5 text-zinc-500 [&>*]:transition-colors hover:[&>*]:text-primary-900">
            <Link to="/products">همه محصولات</Link>
            <Link to="/me/orders">سفارش های شما</Link>
            <Link to="/articles">همه مقالات</Link>
          </div>
        </div>
        <div>
          <h5 className="font-vazirmatn-medium text-lg">دسته‌بندی ها</h5>
          <div className="mt-3 flex max-h-[114px] flex-col flex-wrap items-start gap-y-1.5 text-zinc-500 [&>*]:transition-colors hover:[&>*]:text-primary-900">
            {categories?.map(({ _id, title, englishTitle }) => <Link key={_id} to={`/categories/${englishTitle.toLowerCase().split(" ").join("-")}`}>{title}</Link>)}
          </div>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-zinc-200 pt-5">
        <h2 className="flex items-center justify-center gap-x-1">
          توسعه داده شده با
          <svg xmlns="http://www.w3.org/2000/svg" fill="#ec4130" stroke="none" viewBox="0 0 24 24" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
          و
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#0279d9" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
          </svg>
          توسط
          <Link to="https://github.com/meysamhazrati" className="transition-colors hover:text-primary-900">میثم حضرتی</Link>
        </h2>
        <h2>&copy; این قالب صرفا جهت نمونه کار است و مخاطب حق استفاده شخصی یا تجاری از آن را ندارد.</h2>
      </div>
    </footer>
  );
};

export default Footer;