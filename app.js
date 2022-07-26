// chamando o modulo express

const express = require("express");

// Gerando um ID universal
const { randomUUID } = require("crypto");

// importando o modulo filesystem
const fs = require("fs");

// iniciando a aplicação(app)
const app = express();

// middle
app.use(express.json());

// Array que vai receber as informações
let products = [];

// Ler o arquivo products.json
fs.readFile("products.json", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    // JSON.parse -> traz de volta para o formato de objeto
    products = JSON.parse(data);
  }
});
// Chamado metodos e rotas
/**
 * POST => Inserir um dado
 * GET => Buscar dados
 * PUt => Alterar dados
 * DELETE => Remover dados
 */

/**
 * Passar informações
 * Parametros mais comuns
 * Body => sempre que eu quiser dados para minha aplicação
 * Params => parametro de rotas. Ex.: ID. /product/234669874561
 * Query => Faz parte da rota mas não é obrigatorio. Ex.: /product?id=234669874561&value=546879123
 */

// POST
app.post("/products", (request, response) => {
  // Nome e Preço
  // const body = request.body;
  // Fazendo uma deestruturação do body
  const { name, price } = request.body;

  const product = {
    name,
    price,
    id: randomUUID(), //cria um id randomico
  };

  products.push(product);
  
  productFile();

  return response.json(product);
});

// GET

app.get("/products", (request, response) => {
  return response.json(products);
});

app.get("/products/:id", (request, response) => {
  const { id } = request.params;
  const product = products.find((product) => product.id === id);
  return response.json(product);
});

// Alterar a informação de um produto

app.put("/products/:id", (request, response) => {
  // traz as informações alterada
  const { id } = request.params;
  const { name, price } = request.body;

  // encontrar dentro do array o objeto que será alterado
  // procurar por index pela posição do objeto
  const productIndex = products.findIndex((product) => product.id === id);

  // Alterar o produto na posição selecionanda
  products[productIndex] = {
    // rest operator => capturar todas as informações menos o name, price
    ...products[productIndex],
    name,
    price,
  };

  productFile();

  return response.json({ message: "Produto alterado com sucesso!" });
});

app.delete("/products/:id", (request, response) => {
  const { id } = request.params;
  const productIndex = products.findIndex((product) => product.id === id);

  products.splice(productIndex, 1);

  productFile();

  return response.json({ message: "produto removido com sucesso" });
});

// 
function productFile() {
  fs.writeFile("products.json", JSON.stringify(products), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("produto alterado!");
    }
  });
}

// aplicação escutando na porta 4002
app.listen(4002, () => console.log("Servidor está rodando na porta 4002!"));
