const express = require("express");
const { getQuotes, addQuote, updateQuote, deleteQuote } = require("../controllers/quoteController");
const auth = require("../middlewares/auth");
const quoteRoute = express.Router();

quoteRoute.get("/", auth, getQuotes);
quoteRoute.post("/", auth, addQuote);
quoteRoute.put("/:id", auth, updateQuote);
quoteRoute.delete("/:id", auth, deleteQuote);

module.exports = quoteRoute;