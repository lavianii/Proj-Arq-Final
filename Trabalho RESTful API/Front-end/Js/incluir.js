
function fazPost(url,body) {
   
    let resquest= new XMLHttpRequest();
    resquest.open("POST",url,true);
    resquest.setRequestHeader("Content-type","application/json");
    resquest.send(JSON.stringify(body));

    
    resquest.onload = function () {
        console.log(this.responseText);
    }
    return resquest.responseText;
    
}


function incluir() {

    const url         = "http://localhost:3000/incluir";
    
    const nome        = document.getElementById('nome').value;
    const cpf         = document.getElementById('cpf').value;
    const cep         = document.getElementById('cep').value;
    const nmrCasa     = document.getElementById('nmrCasa').value;
    const complemento = document.getElementById('complemento').value;

    let json = {
        "nome": nome,
        "cpf":  cpf,
        "cep":  cep,
        "complemento": complemento,
        "nmrCasa": nmrCasa

    }
    
    axios.post(url ,json)
    .then((e) => { 

        alert("Dados Enviados com sucesso");
        
    })
        .catch((err) => console.log(err))
}