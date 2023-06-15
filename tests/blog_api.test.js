const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blogModel");
const { blogs, blogInDb } = require("./blog_test_helper");

const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(blogs);
    // const blogObjects = blogs.map(blog => new Blog(blog));
    // const promiseBlogs = blogObjects.map(blogObj => blogObj.save());
    // await Promise.all(promiseBlogs);

});

describe("view blog",() => {

    test("blog are returned as json", async () => {
        const listOfBlogs =  await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type",/application\/json/);

        expect(listOfBlogs.body).toHaveLength(blogs.length);
    });

    test("a specific blog to view", async () => {
        const blogAtStart = await blogInDb();
        const blogToView = blogAtStart[0];
        const resultBlog = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(resultBlog.body).toEqual(blogToView);
    });




    test("verifies that the unique identifier property", async () => {
        const blogAtStart = await blogInDb();
        const blogToView = blogAtStart[0];
        const blog = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(blog.body.id).toBeDefined();
    });
});



describe("delete blog", () => {

    test("delete a specific blog", async () => {
        const blogAtStart = await blogInDb();
        const blogToDelete = blogAtStart[0];
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204);

        const afterDeleteBlogs = await blogInDb();
        expect(afterDeleteBlogs).toHaveLength(blogs.length -1 );

        const content = afterDeleteBlogs.map(blog => blog.title);
        expect(content).not.toContain(blogToDelete.title);

    });
});



describe("create new blog", () => {

    test("failed without token", async () => {
        const newBlog = blogs[0];
        await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(400);
    });

    test("creates a new blog post", async () => {
        const newBlog = blogs[0];
        await api
            .post("/api/blogs")
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1kZm95c2Fsa2F6aUBnbWFpbC5jb20iLCJpZCI6IjY0OGE2ZWYwZDAyZGQxODFmOTFiNjU5OSIsImlhdCI6MTY4Njc5NDAyOCwiZXhwIjoxNjg2ODgwNDI4fQ.FJuo9lKr8fP4J_Hvpav3V-aQapFz6sPJItvriaE-01c")
            .send(newBlog)
            .expect(201)
            .expect("Content-Type",/application\/json/);

        const afterAddABlog = await blogInDb();
        expect(afterAddABlog).toHaveLength(blogs.length + 1 );

        const content = afterAddABlog.map(blog => blog.title);
        expect(content).toContain(newBlog.title);

    });

    test("verify create blogs without likes",async () => {
        const newBlog =  {

            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
        };
        await api
            .post("/api/blogs")
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1kZm95c2Fsa2F6aUBnbWFpbC5jb20iLCJpZCI6IjY0OGE2ZWYwZDAyZGQxODFmOTFiNjU5OSIsImlhdCI6MTY4Njc5NDAyOCwiZXhwIjoxNjg2ODgwNDI4fQ.FJuo9lKr8fP4J_Hvpav3V-aQapFz6sPJItvriaE-01c")
            .send(newBlog)
            .expect(201);
    });

    test("without title or url for new blog response 400",async () => {
        const newBlog =  {
            author: "Michael Chan",
        };
        await api
            .post("/api/blogs")
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1kZm95c2Fsa2F6aUBnbWFpbC5jb20iLCJpZCI6IjY0OGE2ZWYwZDAyZGQxODFmOTFiNjU5OSIsImlhdCI6MTY4Njc5NDAyOCwiZXhwIjoxNjg2ODgwNDI4fQ.FJuo9lKr8fP4J_Hvpav3V-aQapFz6sPJItvriaE-01c")
            .send(newBlog)
            .expect(400);
    });

});

afterAll(async () => {
    await mongoose.connection.close();
});