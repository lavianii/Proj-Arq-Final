function consultar()
{
    const url         = "http://localhost:3000/verCadastro";
    const cpf         = document.getElementById('cpf').value;

    axios.get(`${url}/${cpf}`)
    .then((e) => {location.reload();
    alert("Dados consultados com sucesso")})
    .catch((err) => console.log(err))
    
}

