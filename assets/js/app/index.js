import {RastreioControllers} from './controllers/RastreioControllers.js';



let rastreio = new RastreioControllers();


document.querySelector('#busca').onclick = () => rastreio.buscar();
document.querySelector('#salvar').onclick = () => rastreio.apagar();

