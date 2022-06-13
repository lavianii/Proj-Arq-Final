const express   = require('express');
const bd        = require('./bd/bd.js');
const rotas     = require('./rotas.js');

function middleWareGlobal(req, res, next) 
{
    console.time('Duraçao'); 
    console.log('Iniciou o processamento da requisiçao'+req.metod+'em'+req.url);

    next(); 

    console.log('Terminou o processamento da requisiçao'+req.metod+'em'+req.url);
    console.timeEnd('Duraçao');
}

async function ativaçaoDoServidor() 
{
    const ret = await bd.estruturese(); 

    if (ret === null) 
    {
        console.log('Não foi possivel estabelecer conexao com o BD');
        process.exit(1); 
    }

    if (ret === false) 
    {
        console.log('Não foi possivel estruturar o BD!');
        process.exit(1); 
    }

    const express   = require('express');
    const app       = express();

    app.use(express.json()); 
    app.use(middleWareGlobal);


    app.post('/inculir'             ,rotas.inclusao);
    app.put('/alterar/:cpf'      ,rotas.atualizacao);
    app.delete('/remover/:cpf'   ,rotas.remocao);
    app.get('/ver1/:cpf'         ,rotas.recuperacaoDeUm);
    app.get('/verTodos'             ,rotas.recupereTodos);

    console.log('Servidor Rodando na porta 3000');
    app.listen(3000);
}   

ativaçaoDoServidor();