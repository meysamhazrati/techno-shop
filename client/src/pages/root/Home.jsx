import { useEffect } from "react";
import Landing from "../../components/root/Landing";
import Latests from "../../components/root/Latests";
import AmazingOffer from "../../components/root/AmazingOffer";
import Categories from "../../components/root/Categories";
import BestSellers from "../../components/root/BestSellers";
import Brands from "../../components/root/Brands";
import Articles from "../../components/root/Articles";

const Home = () => {
  useEffect(() => {
    document.title = "تکنوشاپ";
  }, []);

  return (
    <>
      <Landing />
      <Latests />
      <AmazingOffer />
      <Categories />
      <BestSellers />
      <Brands />
      <Articles />
    </>
  );
};

export default Home;