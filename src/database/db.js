// importar a dependencia do sqlite3
const sqlite3 = require('sqlite3').verbose();

// criar o objeto que irá fazer operações no banco de dados 
const db = new sqlite3.Database("./src/database/database.db");

//exporta o objeto db para conseguir puxar com require dentro do server.js
module.exports = db; 
// utilizando o objeto para as operações
// db.serialize(() => {
//     // criar uma tabela dentro do banco de dados
//         db.run(`
//             CREATE TABLE IF NOT EXISTS places (
//                 id INTEGER PRIMARY KEY AUTOINCREMENT,
//                 image TEXT,
//                 name TEXT,
//                 address TEXT,
//                 address2 TEXT, 
//                 state TEXT,
//                 city TEXT, 
//                 items TEXT
//             );
//         `);

//     // Inserir dados na tabela
//         const query = `INSERT INTO places (
//             image,
//             name,
//             address,
//             address2,
//             state,
//             city,
//             items 
//         ) VALUES (?, ?, ?, ?, ?, ?, ?);        
//         `          

//     // array para cadastrar os valores 
//     const values = [
//         "https://images.unsplash.com/photo-1473158912295-779ef17fc94b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80", //imagem
//         "Colectoria", //name
//         "Guilherme Gemballa, Jardim América", //address
//         "Nº 260", //address2
//         "Santa Catarina", //state
//         "Rio do Sul", //city
//         "Resíduos eletrônicos, Lampâdas", //items
//     ];
    
//     function afterInsertData(err){
//          // essa função testa se há erros no cadastro, caso houver, já chama o console.log mostrando o erro, se não dá a msg de sucesso.         
//          if (err){
//             return console.log(err);
//         }
        
//         console.log("Itens cadastrados com sucesso!"); 
//         console.log(this);
//     }

//     db.run(query, values, afterInsertData);


//     // // Consultar dados na tabela
//     // db.all(`SELECT name FROM places`, function(err, rows){
//     //     if (err){
//     //         return console.log(err);
//     //     }
//     //     console.log("Aqui estão seus registros: ");
//     //     console.log(rows);
//     // })

//     // // Deletar dados na tabela
//     // db.run(`DELETE FROM places WHERE id = ?`, [1], function (err){
//     //     if (err){
//     //         return console.log(err);
//     //     }

//     //     console.log("Registro deletado com sucesso!")
//     // });

        
// })