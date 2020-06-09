// faz as requisições para o servidor
const express = require("express");

//executo a variavel que defini em cima
const server = express();

//faz o servidor enxergar a pasta public
server.use(express.static("public"));


//utilizando template engine nunjucks
const nunjunks = require("nunjucks");
nunjunks.configure("src/views", {
    express: server, //ligando o nunjunks ao express
    noCache: true //enquanto estiver desenvolvendo deixar para tirar o cache
});


//redireciona o servidor para a home 
server.get("/", (req, res) =>{
    return res.render("index.html", { 
        title: "Seu marketplace de coleta de resíduos"
    });
});

// redireciona o servidor para o create-point
server.get("/create-point", (req, res) =>{
    return res.render("create-point.html");
});

// redireciona o servidor para o search-results
server.get("/search", (req, res) =>{
    return res.render("search-results.html");
});


//liga o servidor com a porta 3000 
server.listen(3000);

