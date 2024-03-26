import Landing from "../../components/root/Landing";
import Latests from "../../components/root/Latests";
import BestSellers from "../../components/root/BestSellers";
import AmazingOffer from "../../components/root/AmazingOffer";
import Categories from "../../components/root/Categories";
import Banners from "../../components/root/Banners";
import Brands from "../../components/root/Brands";
import Articles from "../../components/root/Articles";

const Home = () => {
  return (
    <>
      <Landing />
      <Latests />
      <AmazingOffer />
      <Categories />
      <Banners />
      <BestSellers />
      <Brands />
      <Articles />
    </>
  );
};

export default Home;