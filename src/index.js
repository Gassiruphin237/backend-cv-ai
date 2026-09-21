import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cvChatRouter from "./routes/cvChat.js";

// Chargement des variables d'environnement au tout début
dotenv.config();

const app = express();
const PORT = process.env.PORT || 2929;

// Middlewares
app.use(cors());
app.use(express.json());

// Déclaration de la route du CV
app.use("/api/chat-cv", cvChatRouter);

// Endpoint de contrôle de santé (Healthcheck)
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Backend CV AI opérationnel avec clé API" });
});

// Lancement du serveur Express
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});