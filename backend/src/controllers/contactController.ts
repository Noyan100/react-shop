import { Request, Response } from "express";
import { sendEmail } from "../utils/emailService";

export const submitContactForm = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ message: "Все поля обязательны для заполнения" });
    }

    // Send email to admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL || process.env.SMTP_FROM || "",
      subject: `Новое сообщение от ${name}`,
      html: `
        <h2>Новое сообщение с контактной формы</h2>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Сообщение:</strong></p>
        <p>${message}</p>
      `,
    });

    // Send confirmation email to user
    await sendEmail({
      to: email,
      subject: "Ваше сообщение получено",
      html: `
        <h2>Спасибо за ваше сообщение!</h2>
        <p>Мы получили ваше сообщение и свяжемся с вами в ближайшее время.</p>
        <p>Ваше сообщение:</p>
        <p>${message}</p>
      `,
    });

    res.status(200).json({ message: "Сообщение успешно отправлено" });
  } catch (error: any) {
    console.error("Contact form submission error:", error);
    res.status(500).json({
      message: "Ошибка при отправке сообщения",
      error: error.message,
    });
  }
};
