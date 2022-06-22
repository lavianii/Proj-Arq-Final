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
    const urlApi="/verEndereço/"
    const CPF          = document.getElementById('cpf').value;
    event.preventDefault();

    axios.get(`${url}${CPF}`)
    .then((response) => {
       
        const Data=response.data;

        nome.textContent=Data[0].nome;
        cpff.textContent=Data[0].cpf;
        nmrCasa.textContent=Data[0].nmrCasa;
        complemento.textContent=Data[0].complemento;
        cep.textContent=Data[0].cep;



   })
    .catch((err) => console.log(err))

    const CEP=document.getElementById('CEP').innerText;
    console.log(CEP);

    axios.get(`${urlApi}${CEP}`)
    .then((response) => {
       
        const Data=response.data;

        console.log(Data);

   })
    .catch((err) => console.log(err))
    
}


