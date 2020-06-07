
// Função para popular o campo de estados 
function populationUFs (){
    const ufSelect = document.querySelector("[name=uf]");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(response => response.json()) //função anonima que retorna o json
        .then(states => { //retorna os estados do json
            
            for(const state of states){ //Esse FOR vai buscar os estados e jogar dentro da variavel state que tá 
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>` //coloca no HTML várias opções
            }
        
        });
}

populationUFs();

function getCities(event){
    const citySelect = document.querySelector("[name=city]");
    const stateInput = document.querySelector("[name=state]");


    //pega o valor da cidade e popula no link da api
    const ufValue = event.target.value; 

    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState];

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    citySelect.innerHTML = "";
    citySelect.disabled = `<option value="">Digite sua cidade</option>;`

    fetch(url)
        .then(response => response.json()) //função anonima que retorna o json
        .then(cities => { //retorna os estados do json
            
            for(const city of cities){ //Esse FOR vai buscar os estados e jogar dentro da variavel state que tá 
                citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>` //coloca no HTML várias opções
            }

        citySelect.disabled = false; 
        });


}


document
    .querySelector("[name=uf]")
    //Fica esperando a mudança do campo UF do create-point, com uma arrow function para liberar as cidades
    .addEventListener("change", getCities); //quando mudar, pega a função getCities e execute

//Itens de coleta
//pegar todos os li's de uma vez só 
const itemsToCollect = document.querySelectorAll(".items-grid li");

for (const item of itemsToCollect){
    item.addEventListener("click", hadleSelectedItem);
}

const collectedItems = document.querySelector("input[name=items]");
let selectedItens = [];

function hadleSelectedItem (event) {

    const itemList = event.target;
    
    // add ou remove any class with javascript
    itemList.classList.toggle("selected");

    const itemId = itemList.dataset.id;

    // verificar se existem itens selecionados, se sim, pega os itens selecionados
    const alreadySelected = selectedItens.findIndex(item => item == itemId); 
    //aqui eu estou fazendo a comparação do item com o itemId, usando arrow function, só vai retornar algo quando item == itemId retornar true

    // se já estiver selecionado
    if (alreadySelected >= 0 ){
        //se o item for diferente, ele filtra e tira do array
        const filteredItems = selectedItens.filter(item => {
            const itemIsDifferent = item != itemId; 
            return itemIsDifferent; 
        });
    //atualiza o array sem os itens filtrados 
    selectedItens = filteredItems; 
    }else{
        //adiciona o item ao array
        selectedItens.push(itemId);
    }
    // atualiza o campo escondido com itens selecionados

    collectedItems.value = selectedItens;
}