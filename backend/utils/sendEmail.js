import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

// ❗ Validate env variables early (IMPORTANT for debugging)
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error("❌ EMAIL ENV MISSING:");
  console.error("EMAIL_USER:", process.env.EMAIL_USER);
  console.error("EMAIL_PASS:", process.env.EMAIL_PASS);
}

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter on startup (VERY USEFUL on Render)
transporter.verify((error, success) => {
  if (error) {
    console.log("❌ Gmail Transport Error:", error);
  } else {
    console.log("✅ Gmail Transport Ready");
  }
});

const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: `"Satvika Style" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Email sent successfully");
    console.log("Message ID:", info.messageId);

    return info;
  } catch (error) {
    console.log("🔥 EMAIL SENDING FAILED:");
    console.log("Name:", error.name);
    console.log("Message:", error.message);
    console.log("Full Error:", error);

    throw error;
  }
};

export default sendEmail;