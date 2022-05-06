import {RastreioModel} from '../models/RastreioModel.js'

export class HistoricoDao{

    #connection;
    #store;

    constructor(connection) {
        
        this.#connection = connection;
        this.#store = 'historico'
    }

    adiciona(rastreio){
        return new Promise((resolve, reject) => {
            
           // let ratreioModel = new RastreioModel(rastreio.codigo, ...rastreio.eventos);

            let request = this.#connection
                .transaction([this.#store], 'readwrite')
                .objectStore(this.#store)
                .add(rastreio);
            
            request.onsuccess = e => {
                //console.log(e);
                 resolve(e);
                 };

            request.onerror = e => {

                console.log(e.target.error);
                reject(e.target.error);
            };
        })
    }

    apagaTodos() {

        return new Promise((resolve, reject) => {


            let request = this.#connection
                .transaction([this.#store], 'readwrite')
                .objectStore(this.#store)
                .clear();


            request.onsuccess = e => resolve('Rastreio removidas com sucesso');

            request.onerror = e => {
                console.log(e.target.error);
                resolve('Não foi possível remover as Rastreios');
            };
        })
    }

    listaTodos() {

        return new Promise((resolve, reject) => {

            let cursor = this.#connection
                .transaction([this.#store], 'readwrite')
                .objectStore(this.#store)
                .openCursor();

            let historico = [];

            cursor.onsuccess = e => {

                let atual = e.target.result;

                if (atual) {

                    let dado = atual.value;

                    historico.push({codigo: dado.codigo,evento: {...dado.evento}});

                    atual.continue();
                } else {
                    resolve(historico);
                }
            }

            cursor.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível listar as negociações')
            };

        })
    }

    exite(codigo) {

        return new Promise((resolve, reject) => {

            let cursor = this.#connection
                .transaction([this.#store], 'readwrite')
                .objectStore(this.#store)
                .openCursor();

            cursor.onsuccess = e => {

                let atual = e.target.result;

                if (atual) {

                    let dado = atual.value;

                    atual.continue();
                } else {
                    resolve(historico);
                }
            }

            cursor.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível listar as negociações')
            };

        })
    }
}