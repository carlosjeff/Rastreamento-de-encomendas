import {StyleHelper} from '../helpers/StyleHelper.js'

export class HistoricoView{

    #elemento;

    constructor(element) {

        this.#elemento = element;
    }


    template(model) {
        let eventos = model.map(e => `
        <div class="conteiner historico__item ">
            <span class="item__icon icon-${StyleHelper.cor(e.evento.status)}"><i class="fa-solid ${StyleHelper.icone(e.evento.status)}"></i></span>
            <h2 class="item__titulo titulo titulo-${StyleHelper.cor(e.evento.status)}">${e.codigo} - ${e.evento.status}</h2>
            <p class="item__data data">${e.evento.dataHora}</p>
        </div>
        `).join('')


        return eventos
        
    }

    update(model) {
        this.#elemento.innerHTML = this.template(model);
    }

}