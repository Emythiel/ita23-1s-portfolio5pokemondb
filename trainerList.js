/*
    Adds all trainers from database to trainers section
*/
const trainersHeaderButton = document.querySelector('#trainers-button');
const trainerSection = document.querySelector('#trainer-section');
let fetchedTrainerList = false;

function getTrainerListData() {
    // Check if list has already been fetched
    if (fetchedTrainerList) {
        return;
    }
    displayLoader(true, trainerSection);
    displayConnectionError(false, trainerSection);
    fetch(
        'http://localhost:3000/trainers',
        {
            method: 'GET'
        }
    )
        .then(response => response.json())
        .then(trainerData => {
            trainerData.forEach(addTrainersToHtml)
            displayLoader(false, trainerSection);
            fetchedTrainerList = true;
        })
        .catch(error => {
            console.log('Server Error: ', error.message);
            displayLoader(false, trainerSection);
            displayConnectionError(true, trainerSection);
        })
}

// Store Trainer Images
// Could not find an image source with consistent link names
const trainerImageLinks = {
    Red: 'https://archives.bulbagarden.net/media/upload/d/d3/Lets_Go_Pikachu_Eevee_Red.png',
    Blue: 'https://archives.bulbagarden.net/media/upload/1/1a/Lets_Go_Pikachu_Eevee_Blue.png',
    Brock: 'https://archives.bulbagarden.net/media/upload/a/a6/Lets_Go_Pikachu_Eevee_Brock.png',
    Misty: 'https://archives.bulbagarden.net/media/upload/f/f6/Lets_Go_Pikachu_Eevee_Misty.png',
    'Lt. Surge': 'https://archives.bulbagarden.net/media/upload/b/bc/Lets_Go_Pikachu_Eevee_Lt_Surge.png',
    Erika: 'https://archives.bulbagarden.net/media/upload/4/47/Lets_Go_Pikachu_Eevee_Erika.png',
    Koga: 'https://archives.bulbagarden.net/media/upload/f/f4/Lets_Go_Pikachu_Eevee_Koga.png',
    Sabrina: 'https://archives.bulbagarden.net/media/upload/7/78/Lets_Go_Pikachu_Eevee_Sabrina.png',
    Blaine: 'https://archives.bulbagarden.net/media/upload/c/c8/Lets_Go_Pikachu_Eevee_Blaine.png',
    Giovanni: 'https://archives.bulbagarden.net/media/upload/a/a7/Lets_Go_Pikachu_Eevee_Giovanni.png',
    Lorelei: 'https://archives.bulbagarden.net/media/upload/f/f7/Lets_Go_Pikachu_Eevee_Lorelei.png',
    Bruno: 'https://archives.bulbagarden.net/media/upload/4/4c/Lets_Go_Pikachu_Eevee_Bruno.png',
    Agatha: 'https://archives.bulbagarden.net/media/upload/5/5c/Lets_Go_Pikachu_Eevee_Agatha.png',
    Lance: 'https://archives.bulbagarden.net/media/upload/c/cd/Lets_Go_Pikachu_Eevee_Lance.png'
}

function addTrainersToHtml(trainer) {
    // Add main trainer box container
    const trainerBoxContainer = document.createElement('div');
    trainerBoxContainer.classList.add('trainer-box');
    trainerSection.appendChild(trainerBoxContainer);

    // Add image element
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('trainer-image-container')
    trainerBoxContainer.appendChild(imageContainer);
    const imageElement = document.createElement('img');
    imageElement.src = trainerImageLinks[trainer.trainer];
    imageContainer.appendChild(imageElement)

    // Add trainer info container
    const trainerInfoContainer = document.createElement('div');
    trainerInfoContainer.classList.add('trainer-info');
    trainerBoxContainer.appendChild(trainerInfoContainer);

    // Add trainer name and location container
    const trainerNameLocationContainer = document.createElement('div');
    trainerNameLocationContainer.classList.add('trainer-name-location');
    trainerInfoContainer.appendChild(trainerNameLocationContainer);
    // Add trainer name
    const trainerNameContainer = document.createElement('div');
    trainerNameContainer.classList.add('trainer-name');
    trainerNameLocationContainer.appendChild(trainerNameContainer);
    const trainerNameTextElement = document.createElement('p');
    trainerNameTextElement.textContent = 'Name:';
    trainerNameContainer.appendChild(trainerNameTextElement);
    const trainerNameValueElement = document.createElement('p');
    trainerNameValueElement.textContent = trainer.trainer;
    trainerNameContainer.appendChild(trainerNameValueElement);
    // Add trainer location
    const trainerLocationContainer = document.createElement('div');
    trainerLocationContainer.classList.add('trainer-location');
    trainerNameLocationContainer.appendChild(trainerLocationContainer);
    const trainerHometown = document.createElement('p');
    trainerLocationContainer.appendChild(trainerHometown);
    // Check if hometown is null or not, and set hometown depending on result
    if (trainer.home_town !== null) {
        trainerHometown.textContent = 'Hometown: ' + trainer.home_town;
    } else {
        trainerHometown.textContent = 'Hometown: Unknown'
    }
    // Check if gym is null or not, add gym if it exist
    if (trainer.gym !== null) {
        const trainerGym = document.createElement('p');
        trainerLocationContainer.appendChild(trainerGym);
        // Check if trainer is leader - if yes, add leader, if no add member
        if (trainer.trainer_id === trainer.leader_id) {
            trainerGym.textContent = trainer.gym + ' (Leader)';
        } else {
            trainerGym.textContent = trainer.gym + ' (Member)';
        }
    }

    // Add trainer team separator container and elements
    const trainerTeamSeparator = document.createElement('div');
    trainerTeamSeparator.classList.add('trainer-info-team-separator');
    trainerInfoContainer.appendChild(trainerTeamSeparator);
    const trainerTeamSeparatorFirstLine = document.createElement('hr');
    trainerTeamSeparator.appendChild(trainerTeamSeparatorFirstLine);
    const trainerTeamSeparatorText = document.createElement('p');
    trainerTeamSeparatorText.textContent = 'Pokemon Team';
    trainerTeamSeparator.appendChild(trainerTeamSeparatorText);
    const trainerTeamSeparatorSecondLine = document.createElement('hr');
    trainerTeamSeparator.appendChild(trainerTeamSeparatorSecondLine);

    // Add trainers team container
    const trainerTeamContainer = document.createElement('div');
    trainerTeamContainer.classList.add('trainer-info-team');
    trainerInfoContainer.appendChild(trainerTeamContainer);

    // Loop through each pokemon team and add
    trainer.team.forEach((pokemon) => {
        const trainerPokemonContainer = document.createElement('div');
        trainerPokemonContainer.classList.add('trainer-info-team-pokemon');
        trainerTeamContainer.appendChild(trainerPokemonContainer);
        const trainerPokemonImageElement = document.createElement('img');
        trainerPokemonImageElement.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon.pokedex_number.toString().padStart(3, '0')}.png`;
        trainerPokemonContainer.appendChild(trainerPokemonImageElement);
        const trainerPokemonNameLevelContainer = document.createElement('div');
        trainerPokemonNameLevelContainer.classList.add('trainer-info-team-pokemon-info');
        trainerPokemonContainer.appendChild(trainerPokemonNameLevelContainer);
        const trainerPokemonName = document.createElement('p');
        trainerPokemonName.textContent = pokemon.name;
        trainerPokemonNameLevelContainer.appendChild(trainerPokemonName);
        const trainerPokemonLevel = document.createElement('p');
        trainerPokemonLevel.textContent = 'Level ' + pokemon.level;
        trainerPokemonNameLevelContainer.appendChild(trainerPokemonLevel);
    });
}

trainersHeaderButton.addEventListener('click', getTrainerListData);
