import {RastreioService} from '../services/RastreioService.js'
import {RastreioView} from '../views/RastreioView.js'

export class RastreioControllers{

    constructor() {
        
        
        let $ = document.querySelector.bind(document);
        
        this._inputCodigoRastreio = $('#cod-rastreio');
        
        this._service = new RastreioService();
        this._rastreioView = new RastreioView($('.estado'))
    }

    buscar(){
        
        this._service.getEncomenda(this._inputCodigoRastreio.value)
            .then(objeto => {
                this._rastreioView.update(objeto);
                console.log(objeto);
            })
            .catch(err => console.log(err));
    }



}