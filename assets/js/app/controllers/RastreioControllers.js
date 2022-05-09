import {RastreioService} from '../services/RastreioService.js'
import {RastreioView} from '../views/RastreioView.js'
import {HistoricoView} from '../views/HistoricoView.js'

export class RastreioControllers{


    #inputCodigoRastreio;
    #divEstadoRastreio;
    #divHistorico;
    #sufix;
    #botao;
    #msgErro;

    #service;
    #rastreioView;

    constructor() {
        
        
        let $ = document.querySelector.bind(document);
        
        this.#inputCodigoRastreio = $('#cod-rastreio');
        this.#divHistorico = $('.historicos');
        this.#divEstadoRastreio = $('.estado');
        this.#sufix = $('.sufixInput');
        this.#botao = $('#busca');
        this.#msgErro = $('.msg-erro')
        
        this.#service = new RastreioService();
        this.#rastreioView = new RastreioView(this.#divEstadoRastreio)

        this.#service.listaHistorico()
            .then(lista => 
                new HistoricoView(this.#divHistorico).update(lista)
            );

        this.mask();
    }

    buscar(codigo){

        if(codigo){
            this.#inputCodigoRastreio.value = codigo;
        }
        let cod = this.#inputCodigoRastreio.value;
        
        this.#service.getEncomenda(cod)
            .then(objeto => this.#rastreioView.update(objeto))
            .then(objeto => this.#service.listaHistorico())
            .then(lista => new HistoricoView(this.#divHistorico).update(lista))
            .catch(err => console.log('erro', err));
    }


    salvar(){
        this.#service.salvarHistorico()
            .then(() => console.log('foi'));
    }

    apagar(){
        this.#service.apagarHistorico().then(res => console.log(res));
    }


    mask(){
        let value = this.#inputCodigoRastreio.value.replace(/ /g, '').toUpperCase();
        value = value.length > 13 ? value.slice(0, 13) : value;
        this.#inputCodigoRastreio.classList
            .toggle('input-erro', 
                (!/([A-Z]{2})([0-9]{9})([A-Z]{2})/.test(value) && 
                value.length == 13))
        
        this.#botao.disabled = this.#inputCodigoRastreio.classList.contains('input-erro') || value.length < 13;

        this.sufix(value);
        this.validacaoCod(value);
        this.#inputCodigoRastreio.value = value;

    }

    sufix(value){

       this.#sufix.textContent = `${value.length}/13`;
    }

    validacaoCod(value){
        this.#botao.disabled = this.#inputCodigoRastreio.classList.contains('input-erro') || 
                                value.length < 13;
        
        this.#msgErro.textContent = this.#inputCodigoRastreio
                                        .classList.contains('input-erro') ?
                                            'O codigo informado esta incorreto!' : ''
    }


}