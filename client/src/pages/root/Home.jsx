import Landing from "../../components/root/Landing";
import Latests from "../../components/root/Latests";
import BestSellers from "../../components/root/BestSellers";
import AmazingOffer from "../../components/root/AmazingOffer";
import Categories from "../../components/root/Categories";
import Banners from "../../components/root/Banners";

const Home = () => {
  return (
    <>
      <Landing />
      <Latests />
      <AmazingOffer />
      <Categories />
      <Banners />
      <BestSellers />
    </>
  );
};

export default Home;