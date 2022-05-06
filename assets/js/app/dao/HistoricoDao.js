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

    edit(chave,rastreio){
        return new Promise((resolve, reject) => {
            
            // let ratreioModel = new RastreioModel(rastreio.codigo, ...rastreio.eventos);
 
             let request = this.#connection
                 .transaction([this.#store], 'readwrite')
                 .objectStore(this.#store)
                 .put(rastreio, chave);
             
             request.onsuccess = e => {
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

    existe(rastreio) {

        return new Promise((resolve, reject) => {

            let cursor = this.#connection
                .transaction([this.#store], 'readwrite')
                .objectStore(this.#store)
                .openCursor();

            cursor.onsuccess = e => {

                let atual = e.target.result;

                if (atual) {

                    let dado = atual.value;

                    if(rastreio.codigo == dado.codigo){
                        this.edit(atual.key, rastreio)
                            .then(e => resolve(e))
                            .catch(err => reject(err));
                    }else{
                        atual.continue();
                    }

                } else {
                   
                    this.adiciona(rastreio)
                        .then(() => resolve())
                        .catch(err => reject(err))
                }
            }

            cursor.onerror = e => {
                reject(e);
            };

        })
    }
}