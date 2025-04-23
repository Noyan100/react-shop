import React, { useState } from "react";
import s from "./Form.module.scss";
import api from "../../../../services/api";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Form: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await api.post("/contact/submit", formData);
      setSuccess("Сообщение успешно отправлено!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err: any) {
      setError(err.response?.data?.message || "Ошибка при отправке сообщения");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={s.container}>
      <div className={s.title}>Свяжись с нами</div>
      <div className={s.subtitle}>
        Мы всегда рады помочь вам и ответить на любые вопросы!
      </div>
      <form className={s.form} onSubmit={handleSubmit}>
        <label htmlFor="name" className={s.name}>
          <input
            type="text"
            id="name"
            placeholder="Имя"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="email" className={s.email}>
          <input
            type="email"
            id="email"
            placeholder="Почта"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="message" className={s.message}>
          <textarea
            id="message"
            placeholder="Написать сообщение..."
            value={formData.message}
            onChange={handleChange}
            required
          />
        </label>
        {error && <div className={s.error}>{error}</div>}
        {success && <div className={s.success}>{success}</div>}
        <button type="submit" className={s.button} disabled={isLoading}>
          {isLoading ? "Отправка..." : "Отправить"}
        </button>
      </form>
    </div>
  );
};

export default Form;
