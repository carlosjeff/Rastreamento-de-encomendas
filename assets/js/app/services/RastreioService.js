import {HttpService} from './HttpService.js'
import {RastreioModel} from '../models/RastreioModel.js'
import {EventosModel} from '../models/EventosModel.js'
import {HistoricoDao} from '../dao/HistoricoDao.js'
import {ConnectionFactory} from './ConnectionFactory.js'
import {Teste} from '../models/teste.js'


export class RastreioService{

    #http;

    constructor() {
        this.#http = new HttpService();
    }


    getEncomenda(codigo){

        let token = '6930b6e0e1f58cf7e33133409f714096c26bd0c31e80b29a8a1acfd15de0e806';
        let user = 'carlos_jefferson_braga@outlook.com';
        let url = 'https://api.linketrack.com/track/json';

        return this.#http.get(`${url}?user=${user}&token=${token}&codigo=${codigo}`)
                         .then(response => this.#criaRastreio(codigo, response));

    }

    #criaRastreio(codigo, objeto){

        let rastreio =  new RastreioModel(codigo, objeto.eventos.map(e => 
            new EventosModel(e.data, e.hora, e.local, e.status, ...e.subStatus)
        ))
        
        return this.salvarHistorico(rastreio).then(() => rastreio);

    }

    salvarHistorico(rastreio){
    

        return ConnectionFactory
            .getConnection()
            .then(connection => new HistoricoDao(connection))
            .then(dao => dao.existe(rastreio.ultimaAtualizacao))
            .catch(error => console.log(error));
    }

    apagarHistorico(){
        
        return ConnectionFactory
            .getConnection()
            .then(connection => new HistoricoDao(connection))
            .then(dao => dao.apagaTodos());
    }

    listaHistorico(){

        return ConnectionFactory
                    .getConnection()
                    .then(connection => new HistoricoDao(connection))
                    .then(dao => dao.listaTodos())
                    .catch(err => {
                        console.log(err);
                        throw new Error('Não foi possível obter as negociações');
                    });

    }

}