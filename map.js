const mapHeaderButton = document.querySelector('#map-button');
const mapSection = document.querySelector('#map-section');

// Initial map setup
const kantoMap = L.map('kanto-map', {
    crs: L.CRS.Simple,
    maxBounds: [[0,0], [1818, 2571]],
    maxBoundsViscosity: 0.5,
    minZoom: -1.2,
    maxZoom: 0,
    zoomSnap: 0.2
});

// Set custom map image
const imageUrl = './images/kantoMap.png'
const bounds = [[0,0], [1818, 2571]];
let image = L.imageOverlay(imageUrl, bounds).addTo(kantoMap);
kantoMap.fitBounds(bounds);
// Set default view and zoom
kantoMap.setView([909, 1285.5], -1.2);


// Fetch town data from API
let fetchedTownData = false;
function getTownsData() {
    // Check if list has already been fetched
    if (fetchedTownData) {
        return;
    }

    fetch(
        'http://localhost:3000/towns',
        {
            method: 'GET'
        }
    )
        .then(response => response.json())
        .then(townData => {
            townData.forEach(addTownDataToMap);
            fetchedTownData = true;
        })
        .catch(error => {
            console.log('Server Error: ', error.message);
        });
}

function addTownDataToMap(town) {
    L.tooltip({
        direction: 'top',
        offset: [0, -10],
        permanent: true
    })
        .setLatLng([town.latitude, town.longitude])
        .setContent(
            `<b>${town.name}</b><br>` +
            `Population: ${town.population}`,
        )
        .addTo(kantoMap)
}

mapHeaderButton.addEventListener('click', getTownsData);
