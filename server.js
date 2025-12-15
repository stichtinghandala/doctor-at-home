/**
 * ============================================================
 * Doctor at Home — Secure Form Server (Render + Local Ready)
 * ============================================================
 * ✅ RSA decryption of encrypted form data
 * ✅ Automatic forwarding to PMS webhook + Formspree fallback
 * ✅ Callback API endpoint for triage call requests
 * ✅ Serves React build from /dist in production
 * ✅ Secure private key loading (works with Render Secret Files)
 */

import express from "express";
import crypto from "crypto";
import fs from "fs";
import fetch from "node-fetch";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Get current directory (for ESM modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Allow CORS for local dev (frontend on :3000)
app.use(cors({ origin: "http://localhost:3000", methods: ["POST", "GET"] }));
app.use(express.json({ limit: "2mb" }));

/* ============================================================
   🔐 Load Private Key (local or Render Secret)
   ============================================================ */
const PRIVATE_KEY_PATH = process.env.PRIVATE_KEY_PATH || "/etc/secrets/private.pem";

if (!fs.existsSync(PRIVATE_KEY_PATH)) {
  console.error("❌ private.pem not found at", PRIVATE_KEY_PATH);
  process.exit(1);
}

const PRIVATE_KEY = fs.readFileSync(PRIVATE_KEY_PATH, "utf8");

/* ============================================================
   🧾 Logger Helper
   ============================================================ */
function log(...args) {
  console.log(`[${new Date().toISOString()}]`, ...args);
}

/* ============================================================
   🧩 ROUTE 1: Encrypted Secure Form
   ============================================================ */
app.post("/api/secure-form", async (req, res) => {
  try {
    const { encrypted } = req.body;
    if (!encrypted) {
      log("❌ Missing 'encrypted' field in request body:", req.body);
      return res.status(400).json({ error: "Missing encrypted payload" });
    }

    log("📦 Received encrypted payload, length:", encrypted.length);

    let decryptedData;
    try {
      const buffer = Buffer.from(encrypted, "base64");
      const decrypted = crypto.privateDecrypt(
        { key: PRIVATE_KEY, padding: crypto.constants.RSA_PKCS1_PADDING },
        buffer
      );
      decryptedData = JSON.parse(decrypted.toString("utf8"));
      log("✅ Successfully decrypted:", decryptedData);
    } catch (err) {
      console.error("❌ RSA decryption failed:", err.message);
      return res.status(500).json({ error: "RSA decryption failed" });
    }

    // --- Send to PMS Webhook ---
    const pmsPromise = fetch("https://ataraxis.health/api/webhook/new-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ encrypted, plain: decryptedData, source: "encrypted-form" }),
    });

    // --- Send to Formspree Fallback ---
    const freeformPromise = fetch("https://formspree.io/f/movgbrdk", {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(decryptedData),
    });

    const results = await Promise.allSettled([pmsPromise, freeformPromise]);
    log("📡 PMS:", results[0].status, "| Freeform:", results[1].status);

    res.json({ ok: true, message: "Form processed successfully" });
  } catch (err) {
    console.error("💥 Decryption or forwarding error:", err);
    res.status(500).json({ error: "Failed to process submission" });
  }
});

/* ============================================================
   🧩 ROUTE 2: Automated Callback Request
   ============================================================ */
app.post("/api/callback-request", async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ error: "Phone number required" });
    }

    log("☎️ Callback requested for:", phone);

    const callResponse = await fetch("https://ataraxis.health/api/webhook/callback-requested", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone,
        timestamp: new Date().toISOString(),
        source: "automated-callback",
      }),
    });

    if (callResponse.ok) {
      log("✅ Callback notification sent successfully");
      res.json({ ok: true, message: "Callback initiated" });
    } else {
      log("⚠️ Remote server returned:", callResponse.status);
      res.status(502).json({ ok: false, message: "Callback failed at remote server" });
    }
  } catch (err) {
    console.error("❌ Callback request failed:", err);
    res.status(500).json({ ok: false, message: "Internal callback error" });
  }
});

/* ============================================================
   🧩 ROUTE 3: Health Check
   ============================================================ */
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

/* ============================================================
   🌐 Serve Frontend (Vite build in /dist)
   ============================================================ */
const distPath = path.join(__dirname, "dist");
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
} else {
  log("⚠️ No /dist folder found — frontend not served (dev mode)");
}

/* ============================================================
   🚀 START SERVER
   ============================================================ */
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  log(`🚀 Doctor at Home API running on port ${PORT}`);
  log(`🔑 Using private key from: ${PRIVATE_KEY_PATH}`);
});
