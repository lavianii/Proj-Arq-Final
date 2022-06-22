function update(){
    const url         = "http://localhost:3000/alterarNome/";
    const cpf         = document.getElementById('cpf').value;

    axios.put(`${url}/${cpf}`
    ).then((e) => { location.reload();
    alert("Nome atualizado com sucesso")})
    .catch((err) => console.log(err))
}

