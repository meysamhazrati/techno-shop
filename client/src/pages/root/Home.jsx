import { useEffect } from "react";
import Header from "../../components/root/Header";
import Landing from "../../components/root/Landing";
import Latests from "../../components/root/Latests";
import AmazingOffer from "../../components/root/AmazingOffer";
import Categories from "../../components/root/Categories";
import Banners from "../../components/root/Banners";
import BestSellers from "../../components/root/BestSellers";
import Brands from "../../components/root/Brands";
import Articles from "../../components/root/Articles";
import MobileNavigation from "../../components/MobileNavigation";
import Footer from "../../components/root/Footer";

const Home = () => {
  useEffect(() => {
    document.title = "تکنوشاپ";
  }, []);

  return (
    <>
      <Header />
      <main className="container pb-20 pt-28 xs:pb-24 lg:pb-12 lg:pt-44">
        <Landing />
        <Latests />
        <AmazingOffer />
        <Categories />
        <Banners />
        <BestSellers />
        <Brands />
        <Articles />
      </main>
      <MobileNavigation />
      <Footer />
    </>
  );
};

export default Home;