const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const userSchema = new Schema({
    name: {
        type: String,
        minLength:3,
        required: [true, "Name should be at-least three characters"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                // Email format validation using regular expression
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: "Please enter a valid email address"
        }
    },
    password: {
        type: String,
        required: true,
        minLength:8,
        // validate: {
        //     validator: function (value) {
        //         // Password validation using regular expression
        //         return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/.test(value);
        //     },
        //     message: "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
        // }
    },
    blogs:[
        {
            type:Schema.Types.ObjectId,
            ref:"Blog"
        }
    ]
});

userSchema.plugin(uniqueValidator);

userSchema.set("toJSON",{
    transform:(document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.password;
    }
});

const User = model("User", userSchema);

module.exports = User;

