export class EventosModel{

    #dataHora;
    #local;
    #status;
    #subStatus = [];
    
    constructor(data, hora, local, status, ...subStatus) {
       this.#dataHora = hora ? `${data} às ${hora}` : data;
       this.#local = local;
       this.#status = status;
       this.#subStatus = this.#subStatus.concat(...subStatus);
       
    }

    get dataHora(){
        return this.#dataHora;
    }

    get local(){
        return this.#local;
    }

    get status(){
        return this.#status;
    }

    get subStatus(){
        return this.#subStatus.slice();
    }

    get all(){
        return {
            dataHora: this.dataHora,
            local: this.local,
            status: this.status,
            subStatus: this.#subStatus.slice()
        }
    }

}