const mongoose = require("mongoose");
const { MONGODB_URI } = require("./config");

// mongo atlas url
const mongoAtlasUrl = MONGODB_URI;

mongoose.set("strictQuery", false);

const mongoDB = () => {
    mongoose
        .connect(mongoAtlasUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("connected");
        })
        .catch((error) => {
            console.error(error.message);
            process.exit(1);
        });
};

module.exports = mongoDB;
