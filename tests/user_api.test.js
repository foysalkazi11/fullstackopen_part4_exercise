const supertest = require("supertest");
const User = require("../models/userModel");
const { users, usersInDb } = require("./user_test_helper");
const app = require("../app");
const bcrypt = require("bcrypt");
// const mongoose  = require("mongoose");

const api = supertest(app);

beforeEach(async () => {
    await User.deleteMany({});
    // await User.insertMany(users);
    for(let user of users){
        const passwordHash = await bcrypt.hash(user.password , 10);
        const newUser = new User({ ...user,password:passwordHash });
        await newUser.save();
    }
});

test("Invalid user not created", async () => {
    const usersAtStart = await usersInDb();
    const newUser = {
        name:"Oh",
        email:"randomOne@gamil",
        password:"123"
    };
    await api
        .post("/api/users")
        .send(newUser)
        .expect(400);

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length );
});

test("create new user", async () => {

    const usersAtStart = await usersInDb();
    const newUser = {
        name:"Random One",
        email:"randomOne@gamil.com",
        password:"R@endom12"
    };

    await api
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .expect("Content-Type",/application\/json/ );

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const content = usersAtEnd.map(user => user.name);
    expect(content).toContain(newUser.name);

});

// afterAll(async () => {
//     await mongoose.connection.close();
// });