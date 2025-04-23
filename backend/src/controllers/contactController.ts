import { Request, Response } from "express";
import { sendEmail, emailTemplates } from "../utils/emailService";

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
      html: emailTemplates.contactForm(name, email, message),
    });

    // Send confirmation email to user
    await sendEmail({
      to: email,
      subject: "Ваше сообщение получено - Техно Строй",
      html: emailTemplates.contactConfirmation(name, message),
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
