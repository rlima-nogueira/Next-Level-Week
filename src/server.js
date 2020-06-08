// faz as requisições para o servidor
const express = require("express");

//executo a variavel que defini em cima
const server = express();

//redireciona o servidor para a home 
server.get("/", (req, res) =>{
    res.sendfile(__dirname + "/views/index.html");
});


//liga o servidor com a porta 3000 
server.listen(3000);

