function excluir() {

    const url = "http://localhost:3000/remover";
    const cpf = document.getElementById('cpf').value;

    preventDefault();


    axios.delete(`${url}/${cpf}`)
        .then((e) => {
            alert("Dados removidos com sucesso")
            location.reload();
        })
        .catch((err) => console.log(err));
}


