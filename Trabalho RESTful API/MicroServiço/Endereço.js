class Endereço{
    #cep;
    #url;
    constructor(cep){
       this.#cep=cep;
       this.#url='https://api.postmon.com.br/v1/cep/'+cep;
    }

    get getEndereço(){
        return this.#url;
    }
}

function checaEndereço(cep) {

    let endereço=new Endereço(cep);

    axios.get(endereço.getEndereço)

        .then(function (response) {
            const data=response.data;

            const endereço={
                rua: data.logradouro,
                bairro:data.bairro,
                cidade: data.cidade,
                estado: data.estado,
                cep: data.cep
            }

            console.log(endereço);
        })

        .catch(function () {
            return null;
        });
  
  }
  

module.exports={checaEndereço};