const Person = require("../models/parsonModel");

const personRoute = require("express").Router();

// get all persons
personRoute.get("/", (req, res) => {
    Person.find({}).then((persons) => {
        res.json(persons);
    });
});

// get a single person
personRoute.get("/:id", (req, res, next) => {
    const id = req.params.id;
    Person.findById(id)
        .then((person) => {
            if (person) {
                res.json(person);
            } else {
                res.status(404).end();
            }
        })
        .catch((err) => {
            next(err);
        });
});

// edit a single person
personRoute.put("/:id", (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    Person.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
        context: "query",
    })
        .then((updatedPerson) => res.json(updatedPerson))
        .catch((err) => next(err));
});

// delete a single person
personRoute.delete("/:id", (req, res, next) => {
    const id = req.params.id;
    Person.findByIdAndDelete(id)
        .then((result) => {
            if (result) {
                res.status(204).json({ success: "Delete successfully" });
            }
            res.status(404).end();
        })
        .catch((err) => next(err));
});

// create a new person
personRoute.post("/", (req, res, next) => {
    const body = req.body;

    const person = {
        name: body.name,
        number: body.number,
    };
    const newPerson = new Person(person);
    newPerson
        .save()
        .then((savedPerson) => {
            res.json(savedPerson);
        })
        .catch((err) => next(err));
});

module.exports = personRoute;