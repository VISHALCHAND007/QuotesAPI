const quoteModel = require("../models/quote");

const getQuotes = async (req, res) => {
    try {
        const quotes = await quoteModel.find({ userId: req.userId });
        res.status(200).json(quotes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." })
    }
};

const addQuote = async (req, res) => {
    const { quote, author } = req.body;
        let newQuote = new quoteModel({
            quote: quote, 
            author: author, 
            userId: req.userId
        });
    try {
        await newQuote.save();
        res.status(201).json(newQuote);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." })
    }
};

const deleteQuote = async (req, res) => {
    try {
        let quoteId = req.params.id;
        const deletedQuote = await quoteModel.findByIdAndRemove(quoteId);
        res.status(202).json(deletedQuote);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." })
    }
};

const updateQuote = async (req, res) => {
    try {
        let quoteId = req.params.id;
        const {quote, author} = req.body;

        const updatedQuote = {
            quote: quote, 
            author: author, 
            userId: req.userId
        };
        await quoteModel.findByIdAndUpdate(quoteId, updatedQuote, {new: true});
        res.status(200).json({updatedQuote});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." })
    }
};
module.exports = { getQuotes, addQuote, deleteQuote, updateQuote };
