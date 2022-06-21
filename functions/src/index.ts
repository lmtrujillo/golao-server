import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";

const app = express();

// middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// api endpoints
app.get("/api", (req, res) => {});

/* UPDATE MATCHES */
app.get("/updateMatches", async (req, res) => {
  res.json({ message: `Update matches! SUIII` });
});

exports.app = functions.https.onRequest(app);
