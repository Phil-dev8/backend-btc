require("dotenv").config();
const axios = require("axios");
const Parser = require("rss-parser");

const fetchCoinData = async () => {
  const url =
    "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";

  try {
    const response = await axios.get(url, {
      headers: {
        "X-CMC_PRO_API_KEY": "6d4ef1dd-90dc-4af6-bcc8-d55123424f62",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      "Une erreur s'est produite lors de la requête à l'API CoinMarketCap",
      error.response
    );
  }
};

const fetchRss = async () => {
  const parser = new Parser();
  const rssUrlBtc = "https://coinacademy.fr/actu/bitcoin?feed=gn";

  try {
    const rss = await parser.parseURL(rssUrlBtc);
    console.log(rss);
    return rss.items;
  } catch (error) {
    throw new Error(
      "Erreur lors de la récupération du flux RSS Bitcoin",
      error
    );
  }
};

module.exports = { fetchCoinData, fetchRss };
