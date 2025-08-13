
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.ECObot_key
});

// Chat route
app.post("/chat", async (req, res) => {
  const userMsg = req.body.message;
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMsg }]
    });
    const botReply = completion.choices[0].message.content.trim();
    res.json({ response: botReply });
  } catch (err) {
    console.error("OpenAI error:", err);
    res.json({ response: "Oops, something went wrong!" });
  }
});

app.listen(3000, "0.0.0.0", () => console.log("Server running on http://0.0.0.0:3000"));
app.get("/", (_req, res) => {
  res.send("EcoBot backend is running!");
});
