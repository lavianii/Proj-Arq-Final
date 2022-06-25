class Pessoa{
    //Criando atributos privativos
    #cpf
    #nome
    #cep
    #complemento
    #nmrCasa


    constructor(cpf, nome, cep, complemento, nmrCasa)
    {
        //esse construtor esta chamando os meus setters
        this.#cpf         = cpf;
        this.#nome        = nome;
        this.#cep         = cep;
        this.#complemento = complemento;
        this.#nmrCasa     = nmrCasa;
    }

    //Criando getters
    get cpf()
    {
        return this.#cpf;
    }

    get nome()
    {
        return this.#nome;
    }
    get cep()
    {
        return this.#cep;
    }

    get complemento()
    {
        return this.#complemento;
    }

    get nmrCasa()
    {
        return this.#nmrCasa;
    }

    //Criando setters
    set cpf (cpf)
    {
        if (cpf === undefined || typeof cpf !== 'string' || cpf==='')
        {
            throw ('Cpf Invalido!!');
        }

        this.#cpf = cpf;
    }

    set nome (nome)
    {
        if (nome === undefined || typeof nome !== 'string' || nome === '')
        {
            throw ('Nome Invalido!!');
        }
            
        this.#nome = nome;
    }
    set cep (cep)
    {
        if (cep===undefined || typeof cep !== 'string' || cep==='')
        {
            throw ('Cep Invalido!!');
        }

        this.#cep = cep;
    }

    set complemento(complemento)
    {
        if (typeof complemento !== 'string') // nao confiro se esta vazio pois pode ser nulo
        {
            throw ('Complemento Invalido!!');
        }
        
        this.#complemento = complemento;
    }

    set nmrCasa(nmrCasa)
    {
        if(nmrCasa === undefined || typeof nmrCasa !== 'number' || isNaN(nmrCasa) || nmrCasa <= 0)
        {
           throw('Numero de casa Invalido!!');
        }
        this.#nmrCasa = nmrCasa;
    }
}

//esta funcao cria um novo usuario
function novo(cpf, nome, cep, complemento, nmrCasa) 
{
    let novo=new Pessoa(cpf, nome, cep, complemento, nmrCasa)
    return novo;
}

module.exports={novo};