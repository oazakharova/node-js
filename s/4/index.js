const express = require("express");
const fs = require("fs");
const path = require("path");
const joi = require("joi");

const app = express();
const userDbPath = path.join(__dirname, "users.json");

// схема валидации полей
const userSchema = joi.object({
  firstName: joi.string().min(2).required(),
  secondName: joi.string().min(2).required(),
  age: joi.number().min(1).required(),
  city: joi.string().min(2),
});

let uniqueUserId = 1;

// use - промежуточный обработчик, который обрабатывает получаемый json,
// он их парсит/стрингифает => доп манипуляции парс/стрингифай больше не нужны
app.use(express.json());

// get all users
app.get("/users", (req, res) => {
  const users = JSON.parse(fs.readFileSync(userDbPath));
  res.send({ users });
});

// get the user by ig
// ":" обозначает "параметр", которое будет передано
app.get("/users/:id", (req, res) => {
  const users = JSON.parse(fs.readFileSync(userDbPath));
  const foundUser = users.find((user) => user.id === +req.params.id);

  res.send({ user: foundUser });
});

// create a new user
app.post("/users", (req, res) => {
  // валидация - всегда в самом начале
  const resultOfValidation = userSchema.validate(req.body);

  if (resultOfValidation.error) {
    return res.status(404).send({ error: resultOfValidation.error.details });
  }

  const users = JSON.parse(fs.readFileSync(userDbPath));

  // creating a new user
  uniqueUserId += 1;
  users.push({ id: uniqueUserId, ...req.body });

  // write the new user into file users.json
  fs.writeFileSync(userDbPath, JSON.stringify(users));

  res.send({ id: uniqueUserId });
});

// update the user by ig
// ":" обозначает "параметр", которое будет передано
app.put("/users/:id", (req, res) => {
  const users = JSON.parse(fs.readFileSync(userDbPath));
  const foundUser = users.find((user) => user.id === +req.params.id);

  if (foundUser) {
    foundUser.firstName = req.body.firstName;
    foundUser.secondName = req.body.secondName;
    foundUser.age = req.body.age;
    foundUser.city = req.body.city;

    fs.writeFileSync(userDbPath, JSON.stringify(users));

    res.send({ user: foundUser });
  } else {
    res.status(404);
    res.send({ user: null });
  }
});

// delete the user by ig
// ":" обозначает "параметр", которое будет передано
app.delete("/users/:id", (req, res) => {
  const users = JSON.parse(fs.readFileSync(userDbPath));
  const foundUser = users.find((user) => user.id === +req.params.id);

  if (foundUser) {
    const foundUserIndex = users.indexOf(foundUser);
    users.splice(foundUserIndex, 1);

    fs.writeFileSync(userDbPath, JSON.stringify(users));

    res.send({ user: foundUser });
  } else {
    res.status(404);
    res.send({ user: null });
  }
});

app.listen(3000);
