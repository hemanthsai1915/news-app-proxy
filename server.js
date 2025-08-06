const express = require("express");
const fetch = require("node-fetch"); // make sure it's v2
const cors = require("cors");

const app = express();
app.use(cors());

const apiKey = "8de7c1f33483425e8361f9304f463ea9"; // do NOT expose this on frontend

app.get("/news", async (req, res) => {
  const query = req.query.q || "India";
  const sortBy = req.query.sortBy || "publishedAt"; // default to 'publishedAt'

  const apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=${sortBy}&apiKey=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

app.listen(3000, () => {
  console.log("Proxy server running on port 3000");
});
