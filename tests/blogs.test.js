const blogs = require("../data/blogsData");
const { dummy, totalLinks, favoriteBlog, mostBlogs, mostLikes } = require("../utils/list_helper");

describe("blog",() => {

    test("dummy return one",() => {
        const blogs = [];
        expect(dummy(blogs)).toBe(1);
    });

    test("total likes",() => {
        expect(totalLinks(blogs)).toBe(36);
    });

    test("favorite one",() => {
        expect(favoriteBlog(blogs)).toEqual(blogs[2]);
    });
    test("most blogs author",() => {
        expect(mostBlogs(blogs)).toEqual({
            author: "Robert C. Martin",
            blogs: 3
        });
    });
    test("most likes author",() => {
        expect(mostLikes(blogs)).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 17
        });
    });
});

