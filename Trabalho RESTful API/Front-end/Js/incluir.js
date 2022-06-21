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
    axios.post(url ,json
        ).then((e) => { location.reload();
        alert("Dados Enviados com sucesso")})
        .catch((err) => console.log(err))
}



