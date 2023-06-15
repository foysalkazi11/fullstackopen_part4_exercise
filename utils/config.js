if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const PORT = process.env.PORT;
const API_URL = process.env.API_URL;

const MONGODB_URI = process.env.NODE_ENV === "test"
    ? process.env.DB_URL
    : process.env.DB_URL_FOR_TESTING;

module.exports = {
    MONGODB_URI,
    PORT,
    API_URL
};