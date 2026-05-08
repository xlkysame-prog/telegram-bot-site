import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const BOT_TOKEN = "8798036184:AAF79RiM_zC2TjbCwHh2w1jZpqVOoIv__y4";
const CHAT_ID = "8135402030";

app.post("/send-telegram", async (req, res) => {
  try {
    const { prenom, age } = req.body;

    console.log("Reçu du site :", prenom, age);

    const message = `
Nouvelle connexion :

Prénom : ${prenom}
Âge : ${age}
`;

    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message
      })
    });

    const data = await response.json();

    console.log("Réponse Telegram :", data);

    res.json({ success: true, telegram: data });

  } catch (error) {
    console.log("Erreur :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.listen(3000, () => {
  console.log("Serveur lancé sur http://localhost:3000");
});