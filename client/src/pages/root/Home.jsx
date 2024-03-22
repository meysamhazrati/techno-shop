import Landing from "../../components/root/Landing";
import BestSellers from "../../components/root/BestSellers";
import AmazingOffer from "../../components/root/AmazingOffer";
import Categories from "../../components/root/Categories";
import Banners from "../../components/root/Banners";

const Home = () => {
  return (
    <>
      <Landing />
      <BestSellers />
      <AmazingOffer />
      <Categories />
      <Banners />
    </>
  );
};

export default Home;