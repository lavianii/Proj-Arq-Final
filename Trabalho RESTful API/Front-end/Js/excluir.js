function excluir() {

    const url         = "http://localhost:3000/remover";
    const cpf         = document.getElementById('cpf').value;
  
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


