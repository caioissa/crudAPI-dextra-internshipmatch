const mongoose = require("mongoose");

const url = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/dextra";

mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});