export class StyleHelper{

    constructor() {

        throw new Error('Essa classe não pode ser instanciada');
    }


    static cor(status){
        return status == 'Objeto encaminhado' ? 'azul' : 
        status == 'Objeto saiu para entrega ao destinatário' ?  'amarelo' :  
        status == 'Código não localizado' ? 'vermelho' : 'verde'
    }

    static icone(status){

        return status == 'Objeto encaminhado' ? 'fa-truck-arrow-right' : 
               status == 'Objeto postado' ? 'fa-envelope' : 
               status == 'Objeto recebido pelos Correios do Brasil' ?  'fa-plane-arrival' : 
               status == 'Objeto saiu para entrega ao destinatário' ? 'fa-truck-ramp-box' :
               status == 'Objeto entregue ao destinatário' ? 'fa-house' : 
               status == 'Código não localizado' ? 'fa-circle-exclamation' :'fa-box';
    }
}
