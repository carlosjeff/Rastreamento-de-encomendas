import {HttpService} from './HttpService.js'
import {RastreioModel} from '../models/RastreioModel.js'
import {EventosModel} from '../models/EventosModel.js'

export class RastreioService{

    constructor() {
        this._http = new HttpService();
    }


    getEncomenda(condigo){

        let token = '6930b6e0e1f58cf7e33133409f714096c26bd0c31e80b29a8a1acfd15de0e806';
        let user = 'carlos_jefferson_braga@outlook.com';
        let url = 'https://api.linketrack.com/track/json';

        return this._http.get(`${url}?user=${user}&token=${token}&codigo=${condigo}`)
                         .then(response => 
                            new RastreioModel(condigo, response.eventos.map(e => 
                                    new EventosModel(e.data, e.hora, e.local, e.status, ...e.subStatus)
                                )));

    }
}