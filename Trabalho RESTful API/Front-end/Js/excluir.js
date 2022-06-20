function excluir() {

    const url         = "http://localhost:3000/remover";
    const cpf         = document.getElementById('cpf').value;
  
    }
    axios.delete(´${url}/${cpf}´
        ).then((e) => { location.reload();
        alert("Dados removidos com sucesso")})
        .catch((err) => console.log(err))
}


