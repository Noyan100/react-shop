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
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          cost: Number(formData.cost),
          sale: Number(formData.sale),
          rating: Number(formData.rating),
          reviews: [], // New products start with no reviews
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Handle unauthorized error
          console.error("Unauthorized: Please login again");
          navigate("/login");
          return;
        }
        throw new Error("Failed to create product");
      }

      const data = await response.json();
      console.log("Product created successfully:", data);
      navigate("/products"); // Redirect to products list after successful creation
    } catch (error) {
      console.error("Error creating product:", error);
      // You might want to add error handling UI here
    }
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

  const deleteItem = (index: number) => {
    if (formData.items.length > 1) {
      setFormData((prev) => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index),
      }));
    }
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
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            placeholder="Введите категорию"
          />
        </div>

        <div className={s.formGroup}>
          <label>Особенность:</label>
          <input
            type="text"
            name="featured"
            value={formData.featured}
            onChange={handleChange}
            required
            placeholder="Введите особенность"
          />
        </div>

        {formData.items.map((item, index) => (
          <div key={index} className={s.itemGroup}>
            <h3>Вариант {index + 1}</h3>
            <button
              type="button"
              className={s.deleteVariant}
              onClick={() => deleteItem(index)}
              title="Удалить вариант"
            />
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
