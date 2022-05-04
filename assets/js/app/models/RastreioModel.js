
export class RastreioModel{

    #codigo;
    #eventos = [];

    constructor(codigo, ...eventos) {
        this.#codigo = codigo;
       this.#eventos = this.#eventos.concat(...eventos)
    }

    get codigo(){
        return this.#codigo;
    }

    get eventos(){
        return this.#eventos.slice();
    }

    get ultimaAtualizacao(){
        return this.#eventos[0];
    }

}
