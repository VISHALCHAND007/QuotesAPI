const express = require("express");
const userRouter = require("./routes/user_route");
const quoteRouter = require("./routes/quote_route");
const { default: mongoose } = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
let PORT = process.env.PORT || 5000;

dotenv.config();
app.use(express.json());
app.use("/user", userRouter);
app.use("/quote", quoteRouter);
app.use(cors());

//listening to different requests
app.get("/", (req, res) => {
    res.send("Quotes API...");
});

mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(PORT, () => {
        console.log("Started server at port: "+ PORT);
    });
}).catch((error) => {
    console.log(error.message)
});