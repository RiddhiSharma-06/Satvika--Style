import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // STARTTLS
  auth: {
    user: process.env.EMAIL_USER,   // your Brevo login email
    pass: process.env.EMAIL_PASS    // Brevo SMTP KEY (xsmtpsib-...)
  }
});

transporter.verify((error) => {
  if (error) {
    console.log("❌ Brevo SMTP Error:", error);
  } else {
    console.log("✅ Brevo SMTP Ready");
  }
});

const sendEmail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: `"Satvika Style" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });

    console.log("✅ Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.log("🔥 EMAIL FAILED:");
    console.log(error);
    throw error;
  }
};

export default sendEmail;