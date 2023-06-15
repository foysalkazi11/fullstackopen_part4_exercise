const User = require("../models/userModel");

const users = [
    {
        name:"Kazi",
        email:"mdfoysalkazi@gamil.com",
        password:"H@ello12"
    },
    {
        name:"Foyasl Kazi",
        email:"foysalkazi11@gamil.com",
        password:"B@ello12"
    },
];

const usersInDb = async () => {
    const users = await User.find({});
    console.log(users);
    return users.map(user => user.toJSON());
};


module.exports = {
    users,
    usersInDb
};