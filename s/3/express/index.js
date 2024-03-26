const express = require("express");
const app = express();

app.use(express.static("static"));

// app.get("/", (req, res) => {
//   res.send(`<h1>Hello</h1>\n<a href="/about">link</a>`);
// });

// app.get("/about", (req, res) => {
//   res.send(`<h1>Hello</h1>\n<a href="/">link</a>`);
// });

app.listen(3000);
