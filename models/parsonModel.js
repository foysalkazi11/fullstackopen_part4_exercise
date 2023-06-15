const mongoose = require("mongoose");
const transformMongoSchema = require("../utils/transformMongoSchema");

const { Schema } = mongoose;

const personSchema = new Schema({
    name: {
        type: String,
        minLength: 5,
        required: true,
    },
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: function (phoneNumber) {
                const parts = phoneNumber.split("-");
                const firstPart = parts[0];
                const secondPart = parts[1];

                if (![2, 3].includes(firstPart.length)) {
                    return false;
                }

                if (!/^\d+$/.test(firstPart) || !/^\d+$/.test(secondPart)) {
                    return false;
                }

                return true;
            },
            message: (props) => `${props.value} is not a valid phone number!`,
        },
        required: [true, "User phone number required"],
    },
});

personSchema.set("toJSON", {
    transform: transformMongoSchema,
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
