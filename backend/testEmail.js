import dotenv from "dotenv";
import sendEmail from "./utils/sendEmail.js";

dotenv.config();
console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS?.length);
sendEmail(
  "sharmariddhi060806@gmail.com",
  "Satvika Style Test",
  "Email service is working successfully!"
)
  .then(() => {
    console.log("Test email sent");
    process.exit();
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });