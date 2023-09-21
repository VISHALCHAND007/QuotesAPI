const mongoose = require("mongoose");

const quoteSchema = mongoose.Schema({
    quote: {
        type: String, 
        required: true
    },
    author: {
        type: String, 
        required: true
    },
    userId: {
        type: mongoose.Schema.ObjectId, 
        ref: "User",
        required: true
    }
},{
    timestamps: true
});

module.exports = mongoose.model("Quote", quoteSchema);