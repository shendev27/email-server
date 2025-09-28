require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(express.json()); // Parses incoming JSON
app.use(cors()); // Allows requests from different origins

// Configure the email transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Load email from environment variables
        pass: process.env.EMAIL_PASS // Use an App Password (not your regular password)
    }
});

// Email sending endpoint
app.post("/send-email", async (req, res) => {
    try {
        const { to, subject, message } = req.body;

        await transporter.sendMail({
            from: `"Mentory" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text: message
        });

        console.log(`Email sent to ${to}`);
        res.json({ success: `Email sent to ${to}` });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send email." });
    }
});

// Start the server
app.listen(3001, () => console.log("Server running on port 3001"));
