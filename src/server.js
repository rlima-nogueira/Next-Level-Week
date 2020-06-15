// faz as requisições para o servidor
const express = require("express");

//executo a variavel que defini em cima
const server = express();

//pegar o objeto do banco de dados
const db = require("./database/db.js");

//faz o servidor enxergar a pasta public
server.use(express.static("public"));

// habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }))

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
    // req.query:  Query Strings da nossa url

    // console.log (req.query);

    return res.render("create-point.html");
});

server.post("/savepoint" , (req, res) => {

    // req.body == o corpo do nosso formulário;
    console.log(req.body);
   

  // inserir dados no banco de dados
        const query = `INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items 
        ) VALUES (?, ?, ?, ?, ?, ?, ?);        
        `          
    // array para cadastrar os valores 
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ];
    
    function afterInsertData(err){
         // essa função testa se há erros no cadastro, caso houver, já chama o console.log mostrando o erro, se não dá a msg de sucesso.         
         if (err){
            console.log(err);
            return res.send("Erro no cadastro!");
        }
        console.log("Itens cadastrados com sucesso!"); 
        console.log(this);

        
        return res.render("create-point.html", {saved: true});
    }
    db.run(query, values, afterInsertData);
    
});

// redireciona o servidor para o search-results
server.get("/search", (req, res) =>{

    const search = req.query.search;

    if(search == " "){
    //pesquisa vazia -> mostrar a página HTML com o TOTAL = 0
        return res.render("search-results.html", {total: 0});
    }

    //pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
    if (err){
        return console.log(err);
    }
    //conta o total de elementos do array
    const total = rows.length;
    //mostrar a página HTML com os dados que são puxados do banco de dados
    return res.render("search-results.html", {places: rows, total});
    })    
});


//liga o servidor com a porta 3000 
server.listen(3000);

