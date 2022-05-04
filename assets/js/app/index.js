import {RastreioControllers} from './controllers/RastreioControllers.js';
import {RastreioModel} from './models/RastreioModel.js'
import {EventosModel} from './models/EventosModel.js'


let rastreio = new RastreioControllers();
let rastreioModel = new RastreioModel(
    'QK906696155BR',
    new EventosModel(
        '26/04/2022', 
        '21:03', 
        'Unidade de Tratamento/VARZEA GRANDE/MT',
        'Objeto encaminhado',
        'De: Unidade de Tratamento/VARZEA GRANDE/MT Para: Agência dos Correios'
        ),
    new EventosModel(
        '19/04/2022', 
        '15:01', 
        'Unidade de Tratamento/CAJAMAR/SP',
        'Objeto encaminhado',
        'De: Unidade de Tratamento/CAJAMAR/SP Para: Unidade de Tratamento'
        )
    ); 


document.querySelector('#busca').onclick = () => rastreio.buscar();

