const mongoose = require("mongoose");
const transformMongoSchema = require("../utils/transformMongoSchema");

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"title required"]
    },
    author:{
        type:String,
        required:[true,"author required"]
    },
    url:{
        type:String,
        required:[true,"url required"]
    },
    likes:{
        type:Number,
        required:[true,"likes required"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

});

blogSchema.set("toJSON",{
    transform:transformMongoSchema
});

const Blog = mongoose.model("Blog",blogSchema);

module.exports = Blog;