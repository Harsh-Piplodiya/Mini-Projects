const allPokemonUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const allStats = document.querySelectorAll(".stats")
const searchInput = document.querySelector("#search-input")
const searchButton = document.querySelector("#search-button")
const pokemonName = document.querySelector("#pokemon-name")
const pokemonId = document.querySelector("#pokemon-id")
const weight = document.querySelector("#weight")
const height = document.querySelector("#height")
const img = document.querySelector("#sprite")
const types = document.querySelector("#types")
const hp = document.querySelector("#hp")
const attack = document.querySelector("#attack")
const defense = document.querySelector("#defense")
const specialAttack = document.querySelector("#special-attack")
const specialDefense = document.querySelector("#special-defense")
const speed = document.querySelector("#speed")
const displayScreen = document.querySelector("#display-screen")
let pokemonUrlArray; // an array of URls
let found = false // to check if the pokemon data has been found or not
let pokemonUrl = "" 
let getPokemonData; // this will hold the pokemon data

const fetchData = async () =>{
    try {
        let fetchPokemonUrl = await fetch(allPokemonUrl); // this will get us the 'Response' from the API
        let getPokemonUrl = await fetchPokemonUrl.json(); // that 'Response' will be converted in JSON form
        pokemonUrlArray = await getPokemonUrl.results; 
    } catch (err){
        alert("Pokémon not found");
        console.log(err);
    }
}

fetchData(); // always remember to call the 'fetch()' method after declaring it.

// this function finds the pokemon through it's 'name' or 'ID'
const findPokemon = (arr) =>{
    arr.forEach((pokemon)=>{
        if(Number(pokemon.id)==Number(searchInput.value)){
            pokemonId.textContent = `#${pokemon.id}`;
            pokemonName.textContent = pokemon.name;
            pokemonUrl = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemon.id}`; //storing the individual URL of the pokemon
            fetchUrl(pokemonUrl); // using that URL we'll fetch the data of that pokemon now.
        }
        
        if(pokemon.name.toLowerCase()==searchInput.value.toLowerCase()){
            pokemonName.textContent = pokemon.name;
            pokemonId.textContent = `#${pokemon.id}`;
            pokemonUrl = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemon.name}`;
            fetchUrl(pokemonUrl);
        } 
    })
}

// this functin makes the 'display-screen-div' visible and then fetches the data of the particular pokemon using the URL we created
const fetchUrl = async(url) => {
    found = true;
    displayScreen.style.visibility = "visible";
    try{
        let fetchPokemonData = await fetch(url)
        getPokemonData = await fetchPokemonData.json()
        updateData(getPokemonData) // this function updates the data that will be shown on the screen
    } catch(err){
        console.log(err)
    }
}

const updateData = (data) => {
    let statsArray = data.stats; // the stats are stored in the form of an array in the API
    let typesArray = data.types;
    statsArray.forEach((stat, index)=>{
        allStats[index].textContent=stat.base_stat;
    })
    typesArray.forEach((type)=>{
        types.innerHTML+=`<span>${type.type.name}</span>`;
    })
    weight.textContent = `Weight: ${data.weight}`;
    height.textContent = `Height: ${data.height}`;
    img.src=data.sprites.front_default;
}

searchButton.addEventListener("click",()=>{
    types.innerHTML = "";
    findPokemon(pokemonUrlArray);
    if (!found){
        alert("Pokémon not found");
        displayScreen.style.visibility = "hidden";
    }
    found = false;
})