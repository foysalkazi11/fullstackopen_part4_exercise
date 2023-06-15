const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const passwordChecker = require("../utils/passwordChecker");

const userRouter =  require("express").Router();

// get all user
userRouter.get("/", async (req,res) => {
    const allUser =  await User.find({}).populate("blogs");
    res.json(allUser);
});

// delete a single blog
userRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const result = await User.findByIdAndDelete(id);
    if(result) {
        if (result) {
            return res.status(204).json({ success: "Delete successfully" });
        }
        res.status(404).end();
    }

});

// create new user
userRouter.post("/", async (req,res) => {
    const { name,email,password } = req.body;
    if (!passwordChecker(password)) {
        return res.status(400).send({ error:"Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    let newUser = {
        name,
        email,
        password:passwordHash
    };

    newUser = new User(newUser);
    newUser = await newUser.save();
    res.status(201).json(newUser);


});

module.exports = userRouter;