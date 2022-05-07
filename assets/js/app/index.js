import {RastreioControllers} from './controllers/RastreioControllers.js';



let rastreio = new RastreioControllers(); 


document.querySelector('#busca').onclick = () => rastreio.buscar();
document.querySelector('.historicos').onclick = e => {

    let array = [ ...e.path.find(e => 
                    e.classList.contains('historico__item')   
                    ).childNodes];

    console.log(array.find(a => a.classList.contains('item__titulo')));
    console.log(e.path);
    if(e.target.classList.contains('item__titulo')){

        rastreio.buscar(e.target.innerText.split(' ')[0]);
    }

}


document.querySelector('#cod-rastreio').addEventListener('input',() => rastreio.mask());