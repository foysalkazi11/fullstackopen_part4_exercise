const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");

const userExtractor = async (req,res,next) => {
    const decodedToken = jwt.verify(req.token,process.env.JWT_SECRET );
    if (decodedToken.id) {
        const user = await User.findById(decodedToken.id);
        req.user = user;
    }else{
        req.user = null;
    }

    next();
};

module.exports = userExtractor;