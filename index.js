
const express = require("express");
const app = express();

app.use(express.json());

// =========================
// ENV dari Render nanti
// =========================
const TOKEN = process.env.WABLAS_TOKEN;
const SECRET_KEY = process.env.WABLAS_SECRET_KEY;

// =========================
// TEST ROUTE
// =========================
app.get("/", (req, res) => {
  res.send("🚀 Wablas Middleware Active");
});

// =========================
// SEND WA
// =========================
app.post("/send", async (req, res) => {

  const { phone, message } = req.body;

  try {

    const response = await fetch("https://sby.wablas.com/api/send-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": TOKEN,
        "Secret-Key": SECRET_KEY
      },
      body: JSON.stringify({
        phone,
        message
      })
    });

    const result = await response.text();

    res.json({
      status: "ok",
      wablas: result
    });

  } catch (err) {
    res.json({
      status: "error",
      message: err.toString()
    });
  }
});

// =========================
// START SERVER
// =========================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
