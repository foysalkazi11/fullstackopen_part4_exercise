const jwt = require("jsonwebtoken");
const Blog = require("../models/blogModel");
// const User = require("../models/userModel");
// const getTokenFrom = require("../utils/getTokenFrom");
require("express-async-errors");
const blogRoute = require("express").Router();

// delete a single blog
blogRoute.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const decodedToken = jwt.verify(req.token,process.env.JWT_SECRET );
    if (!decodedToken.id) return res.status(401).json({ error:"Invalid token" });
    const blog = await Blog.findById(id);
    if(!blog) res.status(400).send({ error:"No blog found" });
    if (blog.user.toString() === decodedToken.id.toString()) {
        const result = await Blog.findByIdAndDelete(id);

        if (result) {
            return res.status(204).send({ success: "Delete successfully" });
        }
        res.status(404).end();
    }else{
        res.status(401).json({ error:"Invalid User" });
    }

});

// delete a single blog
blogRoute.put("/:id", async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const decodedToken = jwt.verify(req.token,process.env.JWT_SECRET );
    if (!decodedToken.id) return res.status(401).json({ error:"Invalid token" });
    const blog = await Blog.findById(id);
    if(!blog) res.status(400).send({ error:"No blog found" });
    if (blog.user.toString() === decodedToken.id.toString()) {
        const result = await Blog.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
            context: "query",
        });
        return res.json(result);

    }else{
        res.status(401).json({ error:"Invalid User" });
    }

});

// get a single blog
blogRoute.get("/:id", async (req, res) => {
    const id = req.params.id;
    const blog = await Blog.findById(id);
    if (blog) {
        if (blog) {
            res.json(blog);
        } else {
            res.status(404).end();
        }
    }

});

// get all blog
blogRoute.get("/", async (req,res) => {
    const result = await Blog.find({}).populate("user");
    res.json(result);

});

// create new blog

blogRoute.post("/", async (req,res) => {
    let newBlog = req.body;
    // if (!newBlog.userId) return res.status(400).send({ error:"User Id required" });
    const decodedToken = jwt.verify(req.token,process.env.JWT_SECRET );
    if (!decodedToken.id) return res.status(401).json({ error:"Invalid token" });
    const user = req.user;
    if (!user) return res.status(400).send({ error:"No user found" });
    if (!newBlog.likes) newBlog.likes = 0;
    newBlog = new Blog({ ...req.body,user:user.id });
    newBlog = await newBlog.save();
    user.blogs = user.blogs.concat(newBlog.id);
    await user.save();
    res.status(201).json(newBlog);


});


module.exports = blogRoute;