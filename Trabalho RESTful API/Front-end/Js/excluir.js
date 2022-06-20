function excluir() {

    const url         = "http://localhost:3000/remover";
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
    axios.delete(url ,json
        ).then((e) => { location.reload();
        alert("Dados removidos com sucesso")})
        .catch((err) => console.log(err))
}


