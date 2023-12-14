/*
    Adds all Pokémon from Database to Pokémon section
*/
const pokemonHeaderButton = document.querySelector('#pokemon-button');
const pokemonSection = document.querySelector('#pokemon-section');
let fetchedPokemonList = false;

function getPokemonListData() {
    // Check if list has already been fetched
    if (fetchedPokemonList) {
        return;
    }
    displayLoader(true, pokemonSection);
    displayConnectionError(false, pokemonSection);
    fetch(
        'http://localhost:3000/pokemon',
        {
            method: 'GET'
        }
    )
        .then(response => response.json())
        .then(pokemonData => {
            pokemonData.forEach(addPokemonToHtml)
            displayLoader(false, pokemonSection)
            fetchedPokemonList = true;
        })
        .catch(error => {
            console.log('Server Error: ', error.message);
            displayLoader(false, pokemonSection)
            displayConnectionError(true, pokemonSection);
        })
}

function addPokemonToHtml(pokemon) {
    // Add main pokemon box container
    const pokemonBoxContainer = document.createElement('div')
    pokemonBoxContainer.classList.add('pokemon-box', `${pokemon.primary_type.toLowerCase()}-type`)
    pokemonSection.appendChild(pokemonBoxContainer);
    
    // Add image and type elements
    const imageContainer = document.createElement('div');
    pokemonBoxContainer.appendChild(imageContainer);
    // Add image to the image container
    const imageElement = document.createElement('img');
    // Add image source - append 2 zeros if needed to match image source link
    imageElement.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon.pokedex_number.toString().padStart(3, '0')}.png`
    imageContainer.appendChild(imageElement)
    // Add type container to the image container
    const typeElementContainer = document.createElement('div');
    typeElementContainer.classList.add('pokemon-type');
    imageContainer.appendChild(typeElementContainer);
    // Add type(s) to type container
    const primaryType = document.createElement('p');
    primaryType.classList.add('primary-type', `${pokemon.primary_type.toLowerCase()}-type`);
    primaryType.textContent = pokemon.primary_type;
    typeElementContainer.appendChild(primaryType);
    // Check if secondary type exist, and add if true
    if (pokemon.secondary_type !== 'null') {
        const secondaryType = document.createElement('p');
        secondaryType.classList.add('secondary-type', `${pokemon.secondary_type.toLowerCase()}-type`);
        secondaryType.textContent = pokemon.secondary_type;
        typeElementContainer.appendChild(secondaryType);
    }

    // Add pokemon info container
    const infoContainer = document.createElement('div');
    infoContainer.classList.add('pokemon-info');
    pokemonBoxContainer.appendChild(infoContainer);

    // Add name and pokedex number container
    const nameDexContainer = document.createElement('div');
    nameDexContainer.classList.add('pokemon-info-namedex');
    infoContainer.appendChild(nameDexContainer);
    // Add Name container and text
    const nameContainer = document.createElement('div');
    nameContainer.classList.add('pokemon-info-name');
    nameDexContainer.appendChild(nameContainer);
    const nameText = document.createElement('p');
    nameText.textContent = 'Name:';
    nameContainer.appendChild(nameText);
    const nameOfPokemon = document.createElement('p');
    nameOfPokemon.textContent = pokemon.name;
    nameContainer.appendChild(nameOfPokemon);
    // Add pokedex container and text
    const pokedexContainer = document.createElement('div');
    pokedexContainer.classList.add('pokemon-info-pokedex');
    nameDexContainer.appendChild(pokedexContainer);
    const pokedexText = document.createElement('p');
    pokedexText.textContent = 'Pokédex:';
    pokedexContainer.appendChild(pokedexText);
    const pokedexValue = document.createElement('p');
    pokedexValue.textContent = `#${pokemon.pokedex_number}`;
    pokedexContainer.appendChild(pokedexValue);

    // Stat line separator
    const statSeparatorContainer = document.createElement('div');
    statSeparatorContainer.classList.add('pokemon-info-stat-separator');
    infoContainer.appendChild(statSeparatorContainer);
    const statFirstLine = document.createElement('hr');
    statSeparatorContainer.appendChild(statFirstLine);
    const statsText = document.createElement('p');
    statsText.textContent = 'Stats';
    statSeparatorContainer.appendChild(statsText);
    const statSecondLine = document.createElement('hr');
    statSeparatorContainer.appendChild(statSecondLine);

    // Stats data container
    const statsContainer = document.createElement('div');
    statsContainer.classList.add('pokemon-info-stats-data');
    infoContainer.appendChild(statsContainer);
    // Health Container and Data
    const healthContainer = document.createElement('div');
    healthContainer.classList.add('pokemon-info-stats-hp');
    statsContainer.appendChild(healthContainer);
    const healthText = document.createElement('p');
    healthText.textContent = 'HP:'
    healthContainer.appendChild(healthText);
    const healthValue = document.createElement('p');
    healthValue.textContent = pokemon.hp;
    healthContainer.appendChild(healthValue);
    // Speed Container and Data
    const speedContainer = document.createElement('div');
    speedContainer.classList.add('pokemon-info-stats-speed');
    statsContainer.appendChild(speedContainer);
    const speedText = document.createElement('p');
    speedText.textContent = 'Speed:';
    speedContainer.appendChild(speedText);
    const speedValue = document.createElement('p');
    speedValue.textContent = pokemon.speed;
    speedContainer.appendChild(speedValue);
    // Attack Container and Data
    const attackContainer = document.createElement('div');
    attackContainer.classList.add('pokemon-info-stats-attack');
    statsContainer.appendChild(attackContainer);
    const attackText = document.createElement('p');
    attackText.textContent = 'Attack:';
    attackContainer.appendChild(attackText);
    const attackValue = document.createElement('p');
    attackValue.textContent = pokemon.attack;
    attackContainer.appendChild(attackValue);
    // Defence Container and Data
    const defenceContainer = document.createElement('div');
    defenceContainer.classList.add('pokemon-info-stats-defence');
    statsContainer.appendChild(defenceContainer);
    const defenceText = document.createElement('p');
    defenceText.textContent = 'Defence:';
    defenceContainer.appendChild(defenceText);
    const defenceValue = document.createElement('p');
    defenceValue.textContent = pokemon.defence;
    defenceContainer.appendChild(defenceValue);
    // Special Attack Container and Data
    const splAttackContainer = document.createElement('div');
    splAttackContainer.classList.add('pokemon-info-stats-spl-attack');
    statsContainer.appendChild(splAttackContainer);
    const splAttackText = document.createElement('p');
    splAttackText.textContent = 'Special Attack:';
    splAttackContainer.appendChild(splAttackText);
    const splAttackValue = document.createElement('p');
    splAttackValue.textContent = pokemon.special_attack;
    splAttackContainer.appendChild(splAttackValue);
    // Special Defence Container and Data
    const splDefenceContainer = document.createElement('div');
    splDefenceContainer.classList.add('pokemon-info-stats-spl-defence');
    statsContainer.appendChild(splDefenceContainer);
    const splDefenceText = document.createElement('p');
    splDefenceText.textContent = 'Special Defence:';
    splDefenceContainer.appendChild(splDefenceText);
    const splDefenceValue = document.createElement('p');
    splDefenceValue.textContent = pokemon.special_defence;
    splDefenceContainer.appendChild(splDefenceValue);
}

pokemonHeaderButton.addEventListener('click', getPokemonListData);
