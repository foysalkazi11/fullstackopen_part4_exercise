const errorHandler = (err, req, res, next) => {
    console.error(err.message);

    if (err.name === "CastError") {
        return res.status(404).send({ error: "malformatted id" });
    } else if (err.name === "ValidationError") {
        return res.status(400).send({ error: err.message });
    } else if (err.name ===  "JsonWebTokenError") {
        return res.status(400).json({ error: err.message });
    } else if (err.name === "TokenExpiredError") {
        return res.status(401).json({
            err: "token expired"
        });
    }

    next(err);
};

module.exports = errorHandler;
