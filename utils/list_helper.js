const dummy = (blogs) => {
    console.log(blogs);
    return 1;
};

const totalLinks = (blogs) => {
    const result = blogs.reduce((total,current) => total + current.likes ,0);
    return result;
};

const favoriteBlog = (blogs) => {
    let topLikes = 0;
    let topLikesBlog = blogs[0];
    for (let blog of blogs) {
        if (blog.likes > topLikes) {
            topLikes = blog.likes;
            topLikesBlog = blog;
        }
    }
    return topLikesBlog;
};

const mostBlogs = (blogs) => {
    let authors = {};
    for (let blog of blogs) {
        if (authors[blog.author]) {
            authors[blog.author] ++;
        }else{
            authors[blog.author] = 1;
        }
    }

    let topAuthor = "";
    let maxBlogs = 0;
    for(let author in authors){
        if (authors[author] > maxBlogs) {
            maxBlogs = authors[author];
            topAuthor = author;
        }
    }


    return {
        author : topAuthor,
        blogs:maxBlogs
    };


};
const mostLikes = (blogs) => {
    let authors = {};
    for (let blog of blogs) {
        if (authors[blog.author]) {
            authors[blog.author] = authors[blog.author]  + blog.likes;
        }else{
            authors[blog.author] = blog.likes;
        }
    }

    let topAuthor = "";
    let maxLikes = 0;
    for(let author in authors){
        if (authors[author] > maxLikes) {
            maxLikes = authors[author];
            topAuthor = author;
        }
    }


    return {
        author : topAuthor,
        likes:maxLikes
    };


};



module.exports = {
    dummy,
    totalLinks,
    favoriteBlog,
    mostBlogs,
    mostLikes,
};