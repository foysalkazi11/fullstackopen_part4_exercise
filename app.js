const express = require("express");
const cors = require("cors");
const requestLogger = require("./utils/middleware/requestLogger");
const mongoDB = require("./utils/mongoConnect");
const personRoute = require("./controllers/person");
const unknownEndpoint = require("./utils/middleware/unknownEndpoint");
const errorHandler = require("./utils/middleware/errorHandler");
const blogRoute = require("./controllers/blog");
const userRouter = require("./controllers/user");
const loginRoute = require("./controllers/login");
const tokenExtractor = require("./utils/middleware/tokenExtractor");
const userExtractor = require("./utils/middleware/userExtractor");

const app = express();

// connect mongo DB
mongoDB();

// middleware
app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(requestLogger);
// app.use(tokenExtractor);
// app.use(userExtractor);
// person route
app.use("/api/persons",personRoute);

// blog route
app.use("/api/blogs",tokenExtractor,userExtractor ,blogRoute);

// user route
app.use("/api/users",userRouter);

// user login route
app.use("/api/login",loginRoute);

app.use(unknownEndpoint);
app.use(errorHandler);


module.exports = app;