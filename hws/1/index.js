/*
Напишите HTTP сервер и реализуйте два обработчика, где:
— По URL “/” будет возвращаться страница, на которой есть гиперссылка
  на вторую страницу по ссылке “/about”

— А по URL “/about” будет возвращаться страница, на которой есть гиперссылка
  на первую страницу “/”

— Также реализуйте обработку несуществующих роутов (404).

— * На каждой странице реализуйте счетчик просмотров. Значение счетчика должно
  увеличиваться на единицу каждый раз, когда загружается страница.
*/

const http = require("http");

const server = http.createServer((req, res) => {
  console.log("Запрос получен");

  const urlHome = "/";
  const urlAbout = "/about";

  let counterHome = 0;
  let counterAbout = 0;

  if (req.url === urlHome) {
    res.writeHead(200, {
      "Content-Type": "text/html;charset=UTF-8",
    });
    res.end(
      `<h1>Добро пожаловать на наш сайт</h1>\n<h2>Ссылка на страницу 
      <a href=${(req.url = urlAbout)}>о нас</a></h2>\n
      <h3>Данная страница просмотрена ${++counterHome} раз(а)</h3>`
    );
  } else if (req.url === urlAbout) {
    res.writeHead(200, {
      "Content-Type": "text/html;charset=UTF-8",
    });
    res.end(
      `<h1>Добро пожаловать на наш сайт</h1>\n<h2>Ссылка на 
      <a href=${(req.url = urlHome)}>главную страницу</a></h2>\n
      <h3>Данная страница просмотрена ${++counterAbout} раз(а)</h3>`
    );
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html;charset=UTF-8",
    });
    res.end(`<h1>Страница не найдена</h1>`);
  }
});

const port = 3000;

server.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
