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

// Store location details, primarily for latitude and longitude for map markers
// Should've been in the MySQL DB, but I didn't have time
const townLocationDetails = [
    {
        name: 'Pallet Town',
        population: 10,
        lat: 640,
        lon: 600,
    },
    {
        name: 'Viridian City',
        population: 34,
        lat: 975,
        lon: 625,
    },
    {
        name: 'Pewter City',
        population: 30,
        lat: 1450,
        lon: 650
    },
    {
        name: 'Cerulean City',
        population: 33,
        lat: 1490,
        lon: 1665,
    },
    {
        name: 'Vermilion City',
        population: 34,
        lat: 800,
        lon: 1655,
    },
    {
        name: 'Lavender Town',
        population: 30,
        lat: 1160,
        lon: 2275,
    },
    {
        name: 'Celadon City',
        population: 68,
        lat: 1175,
        lon: 1225,
    },
    {
        name: 'Fuchsia City',
        population: 36,
        lat: 450,
        lon: 1295,
    },
    {
        name: 'Saffron City',
        population: 47,
        lat: 1170,
        lon: 1660,
    },
    {
        name: 'Cinnabar Island',
        population: 33,
        lat: 130,
        lon: 615,
    }
];

// Loop through the locations and add tooltips
townLocationDetails.forEach((town) => {
    L.tooltip({
        direction: 'top',
        offset: [0, -10],
        permanent: true
    })
        .setLatLng([town.lat, town.lon])
        .setContent(
            `<b>${town.name}</b><br>` +
            `Population: ${town.population}`,
        )
        .addTo(kantoMap)
});

