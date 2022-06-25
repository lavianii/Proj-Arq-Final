function atualizaDados(){
    const cpf         = document.getElementById('CPF').value;
    const nome         = document.getElementById('nome').value;
    const cep           = document.getElementById('CEP').value;
    const complemento   = document.getElementById('complemento').value;
    const nmrCasa         = document.getElementById('nmrCasa').value;
    const url         = "http://localhost:3000/alterarDados/"+cpf;

   event.preventDefault();

    let json = {

        "nome": nome,
        "cep": cep,
        "complemento": complemento,
        "nmrCasa": nmrCasa,
        "cpf":  cpf,
 
    }


    axios.put(url,json)
    .then((e) => { 
        
    alert("Informações atualizadas com sucesso!!"); 
    location.reload();

    })
    .catch((err) => console.log(err));
}

