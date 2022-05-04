const stores = ['historico'];
const version = 1;
const dbName = 'historicoRastreio';

let connection = null

export class ConnectionFactory {

    constructor() {

        throw new Error("Não é posssivel criae instacia de ConnectionFactory");
    }

    static getConnection(){

        return new Promise((resolve, reject) => {

            let openRequest = window.indexedDB.open(dbName,version);

            openRequest.onupgradeneeded = e => {

                ConnectionFactory.#createStone(e.target.result);
            }
    
            openRequest.onsuccess = e => {
    
                if(!connection) {
                    connection = e.target.result;
                }
    
                response(connection);
            };

            openRequest.onerror = e => {
                
                console.log(e.target.result);
                reject(e.target.error.name);
            }
        })
    }

    static #createStone(connection){

        stores.forEach(store => {
            
            if (connection.objectStoreName.conteins(store)) {
                connection.deleteObjectStore(store);
            }

            connection.createObjectStore(store, {autoIncrement: true})
        })
    }
}