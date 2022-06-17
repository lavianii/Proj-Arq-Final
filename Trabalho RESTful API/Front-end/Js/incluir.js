

function fazPost(url,body) {
    console.log(body);
    let resquest= new XMLHttpRequest();
    resquest.open("POST",url,true);
    resquest.setRequestHeader("Content-type","application/json");
    resquest.send(JSON.stringify(body));

    resquest.onload=function () {
        console.log(this.responseText);
    }
    return resquest.responseText;
    
}

function incluir() {
    event.preventDefault();

    const url="http://127.0.0.1:5500/incluir";
    const nome        = document.getElementById('nome').value;
    const cpf         = document.getElementById('cpf').value;
    const cep         = document.getElementById('cep').value;
    const nmrCasa     = document.getElementById('nmrCasa').value;
    const complemento = document.getElementById('complemento').value;

    let body={
        "nome": nome,
        "cpf":  cpf,
        "cep":  cep,
        "complemento": complemento,
        "nmrCasa": nmrCasa
    }
    fazPost(url,body);
}



