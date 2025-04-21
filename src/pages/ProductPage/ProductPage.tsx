import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Accordion from "../../components/Accordion/Accordion";
import { TItem } from "../../redux/types/types";
import About from "./components/About/About";
import Other from "./components/Other/Other";
import Product from "./components/Product/Product";
import Reviews from "./components/Reviews/Reviews";
import s from "./ProductPage.module.scss";

type TProductPage = {};

const ProductPage: React.FC<TProductPage> = ({}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = React.useState<TItem>();
  React.useEffect(() => {
    window.scroll(0, 0);
  }, []);
  React.useEffect(() => {
    async function fetchItem() {
      try {
        const { data } = await axios.get(
          "https://62f37628a84d8c968123bc84.mockapi.io/items/" + id
        );
        setItem(data);
      } catch (error) {
        alert("Ошибка при получении коллекции!");
        navigate("/");
      }
    }
    fetchItem();
  }, []);
  const accordion = [
    {
      title: "Условия возврата мебели",
      text: "Вы можете вернуть мебель в течение 30 дней после покупки. При возврате взимается административный сбор. Возврат средств осуществляется после получения товара на наш склад и проверки его состояния. Обратите внимание: мы принимаем только товары без следов использования и повреждений, в оригинальной упаковке со всеми комплектующими. Индивидуальные заказы и собранная мебель возврату не подлежат. Деньги возвращаем в течение 10 рабочих дней после проверки.",
    },
  ];
  if (!item) {
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
      <div className={s.product}>
        <Product item={item} />
      </div>
      <div className={s.about}>
        <About />
      </div>
      <div className={s.accordion}>
        <div className={s.title}>Часто задаваемые вопросы</div>
        <Accordion items={accordion} />
      </div>
      <div className={s.other}>
        <Other />
      </div>
      <div className={s.reviews}>
        <Reviews items={item.reviews} />
      </div>
    </div>
  );
};

export default ProductPage;
