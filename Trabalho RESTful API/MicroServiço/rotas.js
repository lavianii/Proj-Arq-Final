const microServ=require('./Endereço');
const comunicado=require('../back-end/rotas/comunicado');

async function recuperaEndereço(req, res) 
{

    if (Object.values(req.body).length != 0) 
    {
        const erro = comunicado.novo('DSP','Fornecimento de dados sem proposito','Foram fornecidos dados desnecessarios').object; 
        return res.status(422).json(erro); 
    }

    const cep = req.params.cep; 

    const ret =  microServ.checaEndereço(cep); 

    if (ret === null) 
    {
        const erro = comunicado.novo('CI','CEP invalido','Não foi possivel encontrar este cep').object; 
        return res.status(422).json(erro);    
    }


    return res.status(200).json(ret);

}
module.exports={recuperaEndereço};