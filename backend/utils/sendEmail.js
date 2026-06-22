const sendEmail = async (to, subject, text) => {
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY,
      "Content-Type": "application/json",
      "accept": "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: "Satvika Style",
        email: process.env.EMAIL_USER,
      },
      to: [{ email: to }],
      subject: subject,
      textContent: text,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.log("❌ Brevo API Error:", data);
    throw new Error("Email failed");
  }

  console.log("✅ Email sent successfully");
  return data;
};

export default sendEmail;