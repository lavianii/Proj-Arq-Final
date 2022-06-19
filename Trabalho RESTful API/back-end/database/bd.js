async function getConexao() 
{  
    if (global.conexao && global.conexao.state !== 'disconnected') {return global.conexao;}

    const mysql2    = require('mysql2/promise'); 
    const bdConfig  = require('./bdconfig.js'); 

    try 
    {
        const conexao = await mysql2.createConnection(bdConfig); 
        global.conexao = conexao;
            return conexao;
    } 
    catch (error) {return null;}
    
}
async function estruturese() 
{

    const conexao = await getConexao(); 

    if (conexao === undefined) 
    {
        return null;
    }
    const sql = 'CREATE TABLE IF NOT EXISTS pessoas (cpf VARCHAR(30), nome VARCHAR(60) NOT NULL, cep VARCHAR(20) NOT NULL, complemento VARCHAR(60) , nmrCasa INT NOT NULL, PRIMARY KEY (cpf))';
   
    try 
    {
        await conexao.query(sql);
        return true; // retorna true se a quey foi executada
    
    } 
    catch (error) 
    {
        return false; // retorna false se a conexao nao foi executada
    }
}

module.exports = { getConexao, estruturese}