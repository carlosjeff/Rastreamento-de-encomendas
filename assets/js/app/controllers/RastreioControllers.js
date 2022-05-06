import {RastreioService} from '../services/RastreioService.js'
import {RastreioView} from '../views/RastreioView.js'
import {HistoricoView} from '../views/HistoricoView.js'

export class RastreioControllers{


    #inputCodigoRastreio;
    #service;
    #rastreioView;

    constructor() {
        
        
        let $ = document.querySelector.bind(document);
        
        this.#inputCodigoRastreio = $('#cod-rastreio');
        
        this.#service = new RastreioService();
        this.#rastreioView = new RastreioView($('.estado'))

        this.#service.listaHistorico()
            .then(lista => 
                new HistoricoView($('.historicos')).update(lista)
            );

    }

    buscar(){
        
        this.#service.getEncomenda(this.#inputCodigoRastreio.value)
            .then(objeto => {
                this.#rastreioView.update(objeto);
               // this.salvar(objeto);
                console.log('controler', objeto);
            })
            .catch(err => console.log(err));
    }


    salvar(){
        this.#service.salvarHistorico()
            .then(() => console.log('foi'));
    }

    apagar(){
        this.#service.apagarHistorico().then(res => console.log(res));
    }


}