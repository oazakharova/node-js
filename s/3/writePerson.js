// 1. Создайте файл writePerson.js
// 2. Напишите код, который создаст файл person.json в директории
// запускаемого скрипта и запишет в файл следующий объект:

const fs = require("fs");
const path = require("path");

// const person = {
//   name: "Ivan",
//   surname: "Ivanov",
//   age: 30,
//   city: "Moscow",
// };

// Напишите в нем код, который
// ➜ прочитает файл person.json,
// ➜ уменьшит возраст на 10
// ➜ изменит город на “Ekaterinburg”
// ➜ перезапишет исходный файл person.json

const jsonPath = path.join(__dirname, " person.json"); // __dirname - глобальная константа в окружении nodejs, хранит в себе путь до текущей директории
console.log(jsonPath);

// 2
const person = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
person.age = person.age - 10;
person.city = "“Ekaterinburg”";

fs.writeFileSync(jsonPath, JSON.stringify(person, null, 2));
