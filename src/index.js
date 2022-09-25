const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const server = express();
const bodyParser = require("body-parser");
const bancoDeDados = "bancoDeDados.db";
// require("./script")
server.use(express.static("./"));
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));

// Inicia o servidor
server.listen(3000, "127.0.0.1", () => {
  query =
    "CREATE TABLE IF NOT EXISTS tabela_de_experiencias (id INTEGER PRIMARY KEY AUTOINCREMENT, experiencia TEXT)";

  var db = new sqlite3.Database(bancoDeDados); // Abre o banco

  // inicializa o banco de dados
  db.run(query, [], (err) => {
    if (err) {
      console.error(err);
    }
    console.log("Database running...");
  });

  db.close(); // Fecha o banco

  console.log(`running at http://127.0.0.1:3000/`);
});

server.get("/", (req, res) => {
  // mostra o arquivo html quando a rota é "/"
  res.sendFile(path.resolve(__dirname + "/index.html")); // /home/hitalo/Downloads/Licoes/curriculo/src/index.html
});

server.get("/script.js", (req, res) => {
  // disponibiliza o arquivo javascript para o navegador
  res.sendFile(path.resolve(__dirname + "/script.js"));
});

// Back-end com o CRUD
server.post("/user", (req, res) => {
  sql = `INSERT INTO tabela_de_experiencias (experiencia) VALUES ('${req.body.experiencia}')`; //define as colunas o que será requerido
  var db = new sqlite3.Database(bancoDeDados);
  db.run(sql, [], (err) => {
    if (err) {
      throw err;
    }
  });
  db.close();
  res.end();
});

server.get("/user", (req, res) => {
  sql = "SELECT * FROM tabela_de_experiencias"; //seleciona tudo da tabela
  var db = new sqlite3.Database(bancoDeDados);
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
  db.close();
});

server.delete("/user/:id", (req, res) => {
  sql = `DELETE FROM tabela_de_experiencias WHERE id = ${req.params.id};`;
  var db = new sqlite3.Database(bancoDeDados);
  db.run(sql, [], (err) => {
    if (err) {
      console.log(err);
      throw err;
    }
    res.end();
  });
  db.close();
});

server.put("/user/:id", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");

  sql =
    "UPDATE tabela_de_experiencias SET experiencia= '" +
    req.body.experiencia +
    "'   WHERE id ='" +
    req.params.id +
    "'";
  var db = new sqlite3.Database(bancoDeDados);
  db.run(sql, [], (err) => {
    if (err) {
      throw err;
    }
    res.end();
  });
  db.close();
});
