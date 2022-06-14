class Pessoa{
    //Criando atributos privativps
    #cpf
    #nome
    #complemento
    #nmrCasa

    constructor(cpf, nome, complemento, nmrCasa)
    {
        // esse construtor esta chamando os meus setters
        this.cpf         = cpf;
        this.nome        = nome;
        this.complemento = complemento;
        this.nmrCasa     = nmrCasa;
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
        if (cpf === undefined || typeof cpf !== 'number' || isNaN(cpf) || cpf !== parseInt(cpf) || cpf <= 0)
        {
            throw ('Cpf Invalido!!');
        }

        this.cpf = cpf;
    }

    set nome (nome)
    {
        if (nome === undefined || typeof codigo !== 'string' || nome === '')
        {
            throw ('Nome Invalido!!');
        }
            
        this.#nome = nome;
    }

    set complemento(complemento)
    {
        if (complemento === undefined || typeof complemento !== 'number' || isNaN(complemento) || complemento <= 0)
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

function novo(cpf, nome, complemento, nmrCasa) 
{
    return new Pessoa(cpf, nome, complemento, nmrCasa);
}

module.exports={novo};