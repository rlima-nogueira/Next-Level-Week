

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