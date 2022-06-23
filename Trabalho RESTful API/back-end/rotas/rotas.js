const comunicado    = require('./comunicado');
const pessoa        = require('../database/dbo/pessoa.js');
const pessoas       = require('../database/dao/pessoas.js');


async function inclusao(req, res)   
{
   
    if (Object.values(req.body).length != 5 || !req.body.cpf || !req.body.nome|| !req.body.cep || !req.body.complemento || !req.body.nmrCasa) 
    {     
        const erro = comunicado.novo('Ddi','Dados inesperados','Não foram fornecidos exatamente as 5 informações esperadas(cpf, nome, cep, complemento, numero de sua casa)').object; 
       
        return res.status(422).json(erro); 
    }
   
    let pessoaa;
    try 
    {
        pessoaa = pessoa.novo(req.body.cpf, req.body.nome,req.body.cep, req.body.complemento, req.body.nmrCasa)
    } 
    catch (error) 
    {
        const erro = comunicado.novo('TDE','Dados de tipos errados','cpf deve ser um numero nao vazio, nome deve ser um texto nao vazio e numero da casa deve ser um numero natural positivo').object; 
        return res.status(422).json(erro); 
    }

    const ret = await pessoas.inclua(pessoaa); 

    if (ret === null) 
    {
        const erro = comunicado.novo('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object;     

        return res.status(500).json(erro);    
    }

    if (ret === false) 
    {
        const erro = comunicado.novo('PJE','Pessoa já existe','Já existe uma pessoa cadastrada com esse cpf').object; 
        return res.status(409).json(erro); 
    }

    const sucesso = comunicado.novo('IBS','Inclusao bem sucedida','O Pessoaa incluida com sucesso').object; 
    return res.status(201).json(sucesso); 
}

async function atualizacaoEndereço(req, res) 
{     

    console.log(req.body.cpf, req.body.cep, req.body.nmrCasa)
    // ele pode ser igual a 4 ou 3 porque o complemento pode ser nulo
    if (Object.values(req.body).length != 4 || !req.body.cpf || !req.body.cep || !req.body.nmrCasa || !req.body.complemento)  
    {       
        const erro = comunicado.novo('Ddi','Dados inesperados','Não foram fornecidos exatamente as 3 informações esperadas(cpf, cep, numero de sua casa)').object; 
       
        return res.status(422).json(erro); 
    }
    
    //Verificando se os dados estao corretos
    let verificaDados;
    try 
    {
        verificaDados = pessoa.novo(req.body.cpf, req.body.cep, req.body.nmrCasa, req.body.complemento)
    } 
    catch (error) 
    {
        const erro = comunicado.novo('TDE','Dados de tipos errados','cpf deve ser um numero nao vazio, nome deve ser um numero nao vazio, e numero da casa deve ser um numero natural positivo').object; 
        return res.status(422).json(erro); 
    }

    // Verificando se o CPF é valido
    let ret = await pessoas.recupereCadastro(req.body.cpf);
    
    if (ret === null) 
    {
        const erro = comunicado.novo('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object; 
        return res.status(500).json(erro);       
    }

    if (ret === false) 
    {
        const erro = comunicado.novo('FNC','Falha no comando de SQL','O comando de SQL apresenta algum erro').object; 
        return res.status(409).json(erro);    
    }

    if (ret.length == 0) 
    {
        const erro = comunicado.novo('PNE','Pessoa inexistente','Não há uma pessoa cadastrada com esse cpf').object; 
        return res.status(404).json(erro); 
    }
    
    //Atualizando o Endereço
    ret = await pessoas.atualizeEndereco(pessoa);

    // Verificaçoes da atualizaçao
    if (ret === null) 
    {
        const erro=comunicado.novo('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object; 
        return res.status(500).json(erro); 
    }

    if (ret === false) {

        const erro = comunicado.novo('FNC','Falha de comando de SQL','O comando de SQL apresenta algum erro').object; 
        return res.status(409).json(erro); 
    }

    //Retornando que deu tudo certo
    const sucesso = comunicado.novo('ABS','Atualizaçao bem sucedida','O endereço foi Atualizado com sucesso').object; 
    return res.status(201).json(sucesso); 
}

async function atualizacaoNome(req, res) 
{
    if (Object.values(req.body).length != 2 || !req.body.cpf || !req.body.nome)  
    {
        const erro = comunicado.novo('Ddi','Dados inesperados','Não foram fornecidos exatamente 2 informações esperadas(cpf e nome)').object; 
       
        return res.status(422).json(erro); 
    }
    //Verificando se os dados sao validos
    let verificaPessoa
    try 
    {
       verificaPessoa = pessoa.novo(req.body.cpf, req.body.nome)
    } 
    catch (error) 
    {
        const erro = comunicado.novo('TDE','Dados de tipos errados','cpf deve ser um numero natural positivo, nome deve ser um texto nao vazio').object; 
        return res.status(422).json(erro); 
    }

    //guardando a requisão cpf na variavel cpf
    const cpf = req.params.cpf;

    let ret = await pessoas.recupereCadastro(cpf);
    
     if (ret === null) 
     {
         const erro = comunicado.novo('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object; 
         return res.status(500).json(erro);       
    }

    if (ret === false) 
    {
        const erro = comunicado.novo('FNC','Falha no comando de SQL','O comando de SQL apresenta algum erro').object; 
        return res.status(409).json(erro);    
    }

    if (ret.length == 0) 
    {
       const erro = comunicado.novo('PNE','Pessoa inexistente','Não há uma pessoa cadastrada com esse cpf').object; 
        return res.status(404).json(erro); 
    }
    nome = req.body.nome
    pessoa.nome = nome

     //Atualizando
     ret = await pessoas.atualizeNome(pessoa);

    if (ret === null) 
    {
        const erro=comunicado.novo('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object; 
        return res.status(500).json(erro); 
    }

   if (ret === false) {

    const erro = comunicado.novo('FNC','Falha de comando de SQL','O comando de SQL apresenta algum erro').object; 
       return res.status(409).json(erro); 
    }

    //Retornando sucesso
    const sucesso = comunicado.novo('ABS','Atualizaçao bem sucedida','A pessoa foi Atualizada com sucesso').object; 
    return res.status(201).json(sucesso); 
}

async function remocao (req, res) 
{

    if (Object.values(req.body).length != 0) 
    {
        const erro = comunicado.novo('DSP','Fornecimento de dados sem proposito','Foram fornecidos dados desnecessarios').object; 
        return res.status(422).json(erro); 
    }

    const cpf = req.params.cpf;

    //Verificando se o Cpf existe
    let ret = await pessoas.recupereCadastro(cpf);

    if (ret === null) 
    {
        const erro = comunicado.novo('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object; 
        return res.status(500).json(erro);        
    }

    if (ret === false) 
    {
        const erro = comunicado.novo('FNC','Falha no comando de SQL','O comando de SQL apresenta algum erro').object; 
        return res.status(409).json(erro);    
    }

    if (ret.length == 0) 
    {
        const erro = comunicado.novo('PNE','Pessoa inexistente','Não há pessoas cadastradas com esse cpf').object; 
        return res.status(404).json(erro);    
    }

    //Removendo
    ret = await pessoas.remova(cpf);

    if (ret === null) 
    {
        const erro = comunicado.novo('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object; 
        return res.status(500).json(erro);    
    }

    if (ret === false) 
    {
        const erro = comunicado.novo('FNC','Falha no comando de SQL','O comando de SQL apresenta algum erro').object; 
        return res.status(409).json(erro);    
    }

    //Retornando sucesso
    const sucesso = comunicado.novo('RBS','Remoçao bem sucedida','O pessoa removida com sucesso').object; 
    return res.status(201).json(sucesso);   
}

async function recuperacaoCadastro(req, res) 
{

    if (Object.values(req.body).length != 0) 
    {
        const erro = comunicado.novo('DSP','Fornecimento de dados sem proposito','Foram fornecidos dados desnecessarios').object; 
        return res.status(422).json(erro); 
    }

    const cpf = req.params.cpf; 

    
    const ret = await pessoas.recupereCadastro(cpf); 

    if (ret === null) 
    {
        const erro = comunicado.novo('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object; 
        return res.status(500).json(erro);    
    }

    if (ret === false) 
    {
        const erro = comunicado.novo('FNC','Falha no comando de SQL','O comando de SQL apresenta algum erro').object; 
        return res.status(409).json(erro);    
    }

    //Verificando  se o cpf é valido
    if (ret.length === 0) 
    {
        const erro = comunicado.novo('PNE','Pessoa inexistente','Não há pessoas cadastrado com esse cpf').object; 
        return res.status(404).json(erro);    
    }

    return res.status(200).json(ret);

}

async function recuperacaoCep(req, res) 
{

    if (Object.values(req.body).length != 0) 
    {
        const erro = comunicado.novo('DSP','Fornecimento de dados sem proposito','Foram fornecidos dados desnecessarios').object; 
        return res.status(422).json(erro); 
    }

    const cpf = req.params.cpf; 

    
    const ret = await pessoas.recupereCep(cpf); 

    if (ret === null) 
    {
        const erro = comunicado.novo('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object; 
        return res.status(500).json(erro);    
    }

    if (ret === false) 
    {
        const erro = comunicado.novo('FNC','Falha no comando de SQL','O comando de SQL apresenta algum erro').object; 
        return res.status(409).json(erro);    
    }

    //Verificando  se o cpf é valido
    if (ret.length === 0) 
    {
        const erro = comunicado.novo('PNE','Pessoa inexistente','Não há pessoas cadastrado com esse cpf').object; 
        return res.status(404).json(erro);    
    }

    return res.status(200).json(ret);

}



module.exports = {inclusao, atualizacaoEndereço,atualizacaoNome, remocao, recuperacaoCadastro, recuperacaoCep};