import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cvChatRouter from "./routes/cvChat.js";

// Chargement des variables d'environnement au tout début
dotenv.config();

const app = express();
const PORT = process.env.PORT || 2929;
const DEFAULT_LOCAL_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://ruphingassi.me/",
  "https://intellice-ruphin-delta.vercel.app/"
];

const getAllowedOrigins = () => {
  const configuredOrigins = (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  return configuredOrigins.length > 0
    ? configuredOrigins
    : DEFAULT_LOCAL_ORIGINS;
};

const corsOptions = {
  origin(origin, callback) {
    // Allow requests without Origin, such as health checks and curl.
    if (!origin || getAllowedOrigins().includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Origin not allowed by CORS"));
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());

app.use((error, req, res, next) => {
  if (error.message === "Origin not allowed by CORS") {
    return res.status(403).json({ error: "Origin not allowed by CORS" });
  }

  return next(error);
});

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

export default app;
