const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Email handler
app.post("/contact", async (req, res) => {
  const { name, phone, email, message } = req.body;

  // Setup transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL, // your gmail
      pass: process.env.SMTP_PASSWORD, // app password (not regular password)
    },
  });

  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: process.env.CLIENT_EMAIL,
    subject: "New Contact Form Submission",
    html: `
      <h2>Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong><br>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
