const { response } = require("express");

const nome        = document.getElementById('nome')
const cpf         = document.getElementById('cpf');
const cep         = document.getElementById('cep');
const nmrCasa     = document.getElementById('nmrCasa');
const complemento = document.getElementById('complemento');
const enviar      = document.getElementById('enviar');

/*if (enviar) {
    enviar.addEventListener('click',(event)=>{
        fetch('https://',{
            method:'POST',
            headers:{
                'Content-Type':'application.json'
            },
            body: JSON.stringify({
                nome: nome.value,
                cpf: cpf.Value,
                cep: cep.Value,
                nmrCasa: nmrCasa.Value,
                complemento: complemento.Value,
                

            })
        }).then((response)=>{
            return response.json();
        }).then((data)=>{
            console.log(data);
        })
    })
    
}*/

