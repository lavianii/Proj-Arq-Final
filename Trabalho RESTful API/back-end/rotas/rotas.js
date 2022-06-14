const comunicado    = require('./comunicado');
const pessoa        = require('../database/dbo/pessoa.js');
const pessoas       = require('../database/dao/pessoas.js');

async function inclusao(req, res)   
{
    if (Object.values(req.body).length != 4 || !req.body.cpf || !req.body.nome|| !req.body.complemento || !req.body.nmrCasa) 
    {     
        const erro = comunicado.novo('Ddi','Dados inesperados','Não foram fornecidos exatamente as 4 informações esperadas(cpf, nome, complemento, numero de sua casa)').object; 
       
        return res.status(422).json(erro); 
    }

    let pessoa;
    try 
    {
        pessoa = pessoa.novo(req.body.cpf, req.body.nome, req.body.complemento, req.body.nmrCasa)
    } 
    catch (error) 
    {
        const erro = comunicado.novo('TDE','Dados de tipos errados','cpf deve ser um numero natural positivo, nome deve ser um texto nao vazio, complemento deve ser um numero natural positivo e numero da casa deve ser um numero natural positivo').object; 
        return res.status(422).json(erro); 
    }

    const ret = await pessoa.inclua(pessoa); 

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

async function atualizacao(req, res) 
{
    if (Object.values(req.body).length != 4 || !req.body.cpf || !req.body.nome|| !req.body.complemento || !req.body.nmrCasa)  
    {
        const erro = comunicado.novo('Ddi','Dados inesperados','Não foram fornecidos exatamente as 4 informações esperadas(cpf, nome, complemento, numero de sua casa)').object; 
       
        return res.status(422).json(erro); 
    }

    let pessoa;
    try 
    {
        pessoa = pessoa.novo(req.body.cpf, req.body.nome, req.body.complemento, req.body.nmrCasa)
    } 
    catch (error) 
    {
        const erro = comunicado.novo('TDE','Dados de tipos errados','cpf deve ser um numero natural positivo, nome deve ser um texto nao vazio, complemento deve ser um numero natural positivo e numero da casa deve ser um numero natural positivo').object; 
        return res.status(422).json(erro); 
    }

    const cpf = req.params.cpf;

    if (cpf != pessoa.cpf) 
    {
        const erro = comunicado.novo('TMC','Mudança de cpf','Tentativa de mudar cpf da pessoa').object; 
        return res.status(400).json(erro); 
    }

    let ret = await pessoas.recupereUm(cpf);
    
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
    
    ret = await pessoa.atualize(pessoa);

    if (ret === null) 
    {
        const erro=comunicado.novo('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object; 
        return res.status(500).json(erro); 
    }

    if (ret === false) {

        const erro = comunicado.novo('FNC','Falha de comando de SQL','O comando de SQL apresenta algum erro').object; 
        return res.status(409).json(erro); 
    }

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
    let ret = await pessoas.recupereUm(cpf);

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

    const sucesso = comunicado.novo('RBS','Remoçao bem sucedida','O pessoa removida com sucesso').object; 
    return res.status(201).json(sucesso);   
}

async function recuperacaoDeUm(req, res) 
{

    if (Object.values(req.body).length != 0) 
    {
        const erro = comunicado.novo('DSP','Fornecimento de dados sem proposito','Foram fornecidos dados desnecessarios').object; 
        return res.status(422).json(erro); 
    }

    const cpf = req.params.cpf; 

    const ret = await pessoas.recupereUm(cpf); 

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

    if (ret.length === 0) 
    {
        const erro = comunicado.novo('PNE','Pessoa inexistente','Não há pessoas cadastrado com esse cpf').object; 
        return res.status(404).json(erro);    
    }

    return res.status(200).json(ret);

}

async function recupereTodos(req, res) 
{
    if (Object.values(req.body).length != 0)  
    {
        const erro = comunicado.novo('DSP','Fornecimento de dados sem proposito','Foram fornecidos dados desnecessarios').object; 
        return res.status(422).json(erro);    
    }

    const ret = await pessoas.recupereTodos(); 

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

    return res.status(200).json(ret); 
}

module.exports = {
    inclusao, 
    atualizacao, 
    remocao, 
    recuperacaoDeUm, 
    recupereTodos
};