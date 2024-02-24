require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const { fetchCoinData, fetchRss } = require("../api/cmc_api");
app.use(cors());

app.get("/", async (req, res) => {
  try {
    const [coinData, news] = await Promise.all([fetchCoinData(), fetchRss()]);
    res.json({ coinData: coinData.data[0], news: news });
    console.log(res);
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server started 🚀");
});
