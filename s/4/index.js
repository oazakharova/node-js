const express = require("express");
const fs = require("fs");
const path = require("path");
const { checkSchema } = require("./validation/validator");
const { userSchema } = require("./validation/scheme");

const { getUniqueId } = require("./getUniqueId");

const app = express();
const userDbPath = path.join(__dirname, "users.json");

//let uniqueUserId = 1;

// use - промежуточный обработчик, который обрабатывает получаемый json,
// он их парсит/стрингифает => доп манипуляции парс/стрингифай больше не нужны
app.use(express.json());

app.get("/users", (req, res) => {
  const users = JSON.parse(fs.readFileSync(userDbPath));
  res.send({ users });
});

app.get("/users/:id", (req, res) => {
  const users = JSON.parse(fs.readFileSync(userDbPath));
  const foundUser = users.find((user) => user.id === req.params.id);

  res.send({ user: foundUser });
});

app.post("/users", checkSchema(userSchema), (req, res) => {
  const users = JSON.parse(fs.readFileSync(userDbPath));

  //uniqueUserId += 1;
  const newUserId = getUniqueId(users);
  users.push({ id: newUserId, ...req.body });

  fs.writeFileSync(userDbPath, JSON.stringify(users, null, 2));

  res.send({ id: newUserId });
});

app.put("/users/:id", checkSchema(userSchema), (req, res) => {
  const users = JSON.parse(fs.readFileSync(userDbPath));
  const foundUser = users.find((user) => user.id === req.params.id);

  if (foundUser) {
    foundUser.firstName = req.body.firstName;
    foundUser.secondName = req.body.secondName;
    foundUser.age = req.body.age;
    foundUser.city = req.body.city;

    fs.writeFileSync(userDbPath, JSON.stringify(users, null, 2));

    res.send({ user: foundUser });
  } else {
    res.status(404);
    res.send({ user: null });
  }
});

app.delete("/users/:id", (req, res) => {
  const users = JSON.parse(fs.readFileSync(userDbPath));
  const foundUser = users.find((user) => user.id === req.params.id);

  if (foundUser) {
    const foundUserIndex = users.indexOf(foundUser);
    users.splice(foundUserIndex, 1);

    fs.writeFileSync(userDbPath, JSON.stringify(users, null, 2));

    res.send({ user: foundUser });
  } else {
    res.status(404);
    res.send({ user: null });
  }
});

app.use((req, res) => {
  res.status(404).send({
    message: "URL is not found",
  });
});

app.listen(3000);
