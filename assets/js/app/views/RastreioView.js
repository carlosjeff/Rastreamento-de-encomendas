export class RastreioView {

    #elemento;

    constructor(element) {

        this.#elemento = element;
    }

    template(model) {

        

        let eventos = model.eventos.map(e => `
        <div class="conteiner estado-conteiner">
            <span class="estado__icon estado__icon-${this.#qualCor(e.status)}">
                <i class="fa-solid ${this.#qualIcone(e.status)}"></i>
            </span>
            <ul class="estado__list">
                <li class="estado__titulo estado__titulo-${this.#qualCor(e.status)}">
                    ${
                        e.local + ' - ' + e.status
                    }
                </li>
                <li class="estado__data">
                    ${
                        e.dataHora
                    }
                </li>
                <li class="estado__status">
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

    #qualCor(status){
        return status == 'Objeto encaminhado' ? 'azul' : 
        status == 'Objeto saiu para entrega ao destinatário' ?  'amarelo' : 'verde'
    }

    #qualIcone(status){

        return status == 'Objeto encaminhado' ? 'fa-truck-arrow-right' : 
               status == 'Objeto postado' ? 'fa-envelope' : 
               status == 'Objeto recebido pelos Correios do Brasil' ?  'fa-plane-arrival' : 
               status == 'Objeto saiu para entrega ao destinatário' ? 'fa-truck-ramp-box' :
               status == 'Objeto entregue ao destinatário' ? 'fa-house' : 'fa-box';
    }
}
