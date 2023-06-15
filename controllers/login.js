const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const loginRoute = require("express").Router();


loginRoute.get("/", async (req, res) => {
    const { email,password } = req.body;
    const existingUser = await User.findOne({ email });
    if(!existingUser) return res.status(400).send({ error:"User not found" });
    const isPasswordCorrect = existingUser === null ? false : await bcrypt.compare(password,existingUser.password);
    if(!isPasswordCorrect) return res.status(401).send({ error:"Email or password incorrect" });

    const userForToken = {
        email,
        id:existingUser.id
    };

    const token  = jwt.sign(userForToken,process.env.JWT_SECRET, { expiresIn: 24*60*60 }); // token expire after one day
    res.status(200).json( { token:token,id:existingUser._id,name:existingUser.name,email:existingUser.email } );
} );

module.exports = loginRoute;