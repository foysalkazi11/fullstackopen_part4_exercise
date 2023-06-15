const getTokenFrom = require("../getTokenFrom");

const tokenExtractor = (req,res,next) => {
    const token = getTokenFrom(req);
    req.token = token;
    next();
};

module.exports  = tokenExtractor;