const express   = require('express');
const bd        = require('./back-end/database/bd.js')
const rotas     = require('./back-end/rotas/rotas.js');


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

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });

    app.post('/incluir'                  ,rotas.inclusao);
    app.put('/alterarEndereco/:cpf'      ,rotas.atualizacaoEndereço);
    app.put('/alterarNome/:cpf'          ,rotas.atualizacaoNome);
    app.delete('/remover/:cpf'           ,rotas.remocao);
    app.get('/verCadastro/:cpf'          ,rotas.recuperacaoCadastro);
    app.get('/verCep'                    ,rotas.recuperacaoCep);

    console.log('Servidor Rodando na porta 3000');
    app.listen(3000);
}   

ativaçaoDoServidor();