import { useState, useEffect } from "react";
import Section from "./Section";
import Banner from "./Banner";

const Banners = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    setBanners([
      { image: "popular.jpg", title: "محبوب‌ترین", subTitle: "محصولات از نظر کاربران", to: "/products?sort=popular" },
      { image: "variety.jpg", title: "تنوع", subTitle: "در رنگ، اندازه، کارایی", to: "/products" },
    ]);
  }, []);

  return (
    <Section className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-6">
      {banners.map((banner, index) => <Banner key={index} {...banner} />)}
    </Section>
  );
};

export default Banners;