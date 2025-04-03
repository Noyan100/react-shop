import React from "react";
import s from "./HomePage.module.scss";
import collectionOne from "./assets/collection-one.jpg";
import collectionTwo from "./assets/collection-two.jpg";
import collectionThree from "./assets/collection-three.jpg";
import collectionFour from "./assets/collection-four.jpg";
import collectionFive from "./assets/collection-five.jpg";
import itemOne from "./assets/item-one.svg";
import itemTwo from "./assets/item-two.svg";
import itemThree from "./assets/item-three.svg";
import itemFour from "./assets/item-four.svg";
import Intro from "./components/Intro/Intro";
import Collections from "./components/Collections/Collections";
import About from "./components/About/About";
import Carousel from "../../components/Carousel/Carousel";
import MadeInfo from "./components/MadeInfo/MadeInfo";
import WriteAbout from "./components/WriteAbout/WriteAbout";
import ViewProduct from "./components/ViewProduct/ViewProduct";
import axios from "axios";

type THome = {};

const Home: React.FC<THome> = ({}) => {
  React.useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const collection = [
    collectionTwo,
    collectionTwo,
    collectionTwo,
    collectionTwo,
    collectionTwo,
    collectionTwo,
    collectionTwo,
    collectionTwo,
    collectionTwo,
  ];
  const collectionsOne = [
    { value: "Коллекция 1 ", image: collectionOne, path: "/", size: 2 },
    { value: "Коллекция 2", image: collectionTwo, path: "/", size: 1 },
    { value: "Коллекция 3", image: collectionThree, path: "/", size: 1 },
    { value: "Коллекция 4", image: collectionFour, path: "/", size: 1 },
    { value: "Коллекция 5", image: collectionFive, path: "/", size: 1 },
  ];
  const collectionsTwo = [
    { value: "Коллекция 1", image: collectionOne, path: "/", size: 2 },
    { value: "Коллекция 2", image: collectionTwo, path: "/", size: 1 },
    { value: "Коллекция 3", image: collectionThree, path: "/", size: 1 },
    { value: "Коллекция 4", image: collectionFour, path: "/", size: 1 },
    { value: "Коллекция 5", image: collectionFive, path: "/", size: 1 },
  ];
  const [swipers, setSwipers] = React.useState();
  const [views, setViews] = React.useState([]);
  React.useEffect(() => {
    async function fetchSwipers() {
      try {
        const { data } = await axios.get(
          "https://62f37628a84d8c968123bc84.mockapi.io/items?page=1&l=8"
        );
        setSwipers(data);
        setViews(data);
      } catch (error) {}
    }
    fetchSwipers();
  }, []);

  if (!swipers) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "100px 0",
          fontSize: "60px",
        }}
      >
        Загрузка...
      </div>
    );
  }

  return (
    <div className={s.container}>
      <Intro />
      <Collections items={collectionsOne} />
      <About />
      <Carousel
        title="Есть в наличии"
        subtitle="Можно чёт добавить"
        items={swipers}
      />
      <MadeInfo />
      {/* <Collections
        title="Explore each unique collection"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est id pretium pellentesque leo. Lorem."
        items={collectionsTwo}
  />*/}
      <WriteAbout collection={collection} />
      <ViewProduct items={views.slice(0, 4)} />
    </div>
  );
};

export default Home;
