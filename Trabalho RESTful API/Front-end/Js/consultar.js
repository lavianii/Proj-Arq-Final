
function consultar()
{
    const cpff=document.getElementById('CPF');
    const nome=document.getElementById('nome');
    const rua=document.getElementById('rua');
    const bairro=document.getElementById('bairro');
    const cidade=document.getElementById('cidade');
    const nmrCasa=document.getElementById('nmrCasa');
    const complemento=document.getElementById('complemento');
    const cep=document.getElementById('CEP');

    const url         = "http://localhost:3000/verCadastro/";
    const urlApi="https://api.postmon.com.br/v1/cep/"
    const CPF          = document.getElementById('cpf').value;
    event.preventDefault();

    

    axios.get(`${url}${CPF}`)
    .then((response) => {
       
        const Data=response.data;

        nome.textContent=Data[0].nome;
        cpff.textContent=Data[0].cpf;
        nmrCasa.textContent=Data[0].nmrCasa;
        complemento.textContent=Data[0].complemento;
    

        axios.get(`${urlApi}${Data[0].cep}`)
        .then((response) => {
           
            const Data=response.data;

            bairro.textContent=Data.bairro;
            rua.textContent=Data.logradouro;
            cidade.textContent=(`${Data.cidade}-${Data.estado}`);
            cep.textContent=Data.cep;
    
            
    
       })
        .catch((err) => console.log(err))

   
   })
    .catch((err) => console.log(err))


    
}


