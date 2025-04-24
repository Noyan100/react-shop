import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import s from "./AddProductPage.module.scss";

const AddProductPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    cost: "",
    sale: "",
    rating: "",
    category: "",
    featured: "",
    items: [{ color: "", photos: [""] }],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement product creation API call
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const newItems = [...prev.items];
      newItems[index] = { ...newItems[index], [field]: value };
      return { ...prev, items: newItems };
    });
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { color: "", photos: [""] }],
    }));
  };

  if (!user || user.role !== "admin") {
    navigate("/");
    return null;
  }

  return (
    <div className={s.container}>
      <h1>Добавить новый товар</h1>
      <form onSubmit={handleSubmit} className={s.form}>
        <div className={s.formGroup}>
          <label>Название:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={s.formGroup}>
          <label>Цена:</label>
          <input
            type="number"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            required
          />
        </div>

        <div className={s.formGroup}>
          <label>Скидка (%):</label>
          <input
            type="number"
            name="sale"
            value={formData.sale}
            onChange={handleChange}
          />
        </div>

        <div className={s.formGroup}>
          <label>Рейтинг:</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            min="1"
            max="5"
            required
          />
        </div>

        <div className={s.formGroup}>
          <label>Категория:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Выберите категорию</option>
            <option value="Диваны">Диваны</option>
            <option value="Кресла">Кресла</option>
            <option value="Стулья">Стулья</option>
            <option value="Журнальные столики">Журнальные столики</option>
          </select>
        </div>

        <div className={s.formGroup}>
          <label>Особенность:</label>
          <select
            name="featured"
            value={formData.featured}
            onChange={handleChange}
            required
          >
            <option value="">Выберите особенность</option>
            <option value="Скидки">Скидки</option>
            <option value="Тренды">Тренды</option>
            <option value="Новинки">Новинки</option>
          </select>
        </div>

        {formData.items.map((item, index) => (
          <div key={index} className={s.itemGroup}>
            <h3>Вариант {index + 1}</h3>
            <div className={s.formGroup}>
              <label>Цвет (HEX):</label>
              <input
                type="text"
                value={item.color}
                onChange={(e) =>
                  handleItemChange(index, "color", e.target.value)
                }
                required
              />
            </div>
            <div className={s.formGroup}>
              <label>URL фото:</label>
              <input
                type="text"
                value={item.photos[0]}
                onChange={(e) => {
                  const newItems = [...formData.items];
                  newItems[index].photos = [e.target.value];
                  setFormData((prev) => ({ ...prev, items: newItems }));
                }}
                required
              />
            </div>
          </div>
        ))}

        <button type="button" onClick={addItem} className={s.addButton}>
          Добавить вариант
        </button>

        <button type="submit" className={s.submitButton}>
          Создать товар
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
