const http = require("http");

http

  .createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "application/json" });

    if (request.url === "/produto") {
      response.end(
        JSON.stringify({
          message: "Rota Produto",
        })
      );
    }

    if (request.url === "/usuario") {
      response.end(
        JSON.stringify({
          message: "Rota Usuários",
        })
      );
    }
    //else 
    response.end(
        JSON.stringify({
            message: "Qualquer Outra Rota"
        }))
  })
  .listen(4001, () => console.log("servidor esta rodando na porta 4001"));
