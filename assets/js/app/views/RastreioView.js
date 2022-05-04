import {StyleHelper} from '../helpers/StyleHelper.js'

export class RastreioView {

    #elemento;

    constructor(element) {

        this.#elemento = element;
    }

    template(model) {

        

        let eventos = model.eventos.map(e => `
        <div class="conteiner estado-conteiner">
            <span class="icon icon-${StyleHelper.cor(e.status)}">
                <i class="fa-solid ${StyleHelper.icone(e.status)}"></i>
            </span>
            <ul class="list">
                <li class="titulo titulo-${StyleHelper.cor(e.status)}">
                    ${
                        e.local + ' - ' + e.status
                    }
                </li>
                <li class="data">
                    ${
                        e.dataHora
                    }
                </li>
                <li class="status">
                    ${
                        e.subStatus.join('')
                    }
                </li>
            </ul>
        </div>
        `).join('')


        return `
                <div class="conteiner estado__header">
                    <img class="estado__logo__correios" src="./assets/img/correios-logo.svg"></img>
                    <h2>${model.codigo}</h2>
                    <p class="estado__data">${model.ultimaAtualizacao.dataHora}</p>
                </div>
                ${eventos}
        `
    }

    update(model) {

        this.#elemento.innerHTML = this.template(model);
    }

    
}
