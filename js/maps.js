let selectedMap = "uk-nations"; // Default map to load

// Function to load an SVG map
function loadMap(mapName) {
    selectedMap=mapName;
    deleteTableAndRegions() 
    console.log('Loading map:', mapName);

    // Code to load the SVG file (e.g., using fetch API)
    fetch(`maps/${mapName}.svg`)
        .then(response => response.text())
        .then(svgData => {
            const mapContainer = document.getElementById('map-container');
            mapContainer.innerHTML = svgData;
            initializeRegionObjects();

            // Wait for a short delay to ensure the SVG is rendered
            setTimeout(() => {
                updateSelectedSVGMap(mapName);
            }, 0); // A delay of 0 ms is often enough, but you can increase this if needed
        })
        .catch(error => console.error('Error loading map:', error));
}

function deleteTable() {
    const table = document.getElementById('regionsTable');
    if (table) {
        table.remove();
    }
}

function deleteRegions() {
    for (const id in regions) {
        const regions = document.querySelectorAll('.region-class'); // Example selector
regions.forEach(region => region.remove());
    }
    regions = {};
}

function deleteTableAndRegions() {
    deleteTable();
    deleteRegions();
}


let regions = {}; // Object to store region instances
let tableManager = new TableManager();

function initializeRegionObjects() {
    // Handle countries represented by multiple paths (class name)
    document.querySelectorAll('path[class]').forEach(element => {
        let countryName = element.getAttribute('class');
        if (!regions[countryName]) {
            regions[countryName] = new Region(countryName);
        }
        element.addEventListener('click', () => regions[countryName].handleClick());
    });

    // Handle countries represented by a single path (ID)
    document.querySelectorAll('path[name]').forEach(element => {
        let countryName = element.getAttribute('name');
        let countryId = element.getAttribute('id');

        // If the country has an id which is different to name, change id property to match name
        if (countryId && countryId !== countryName) {
            element.setAttribute('id', countryName);
        }

        regions[countryName] = new Region(countryName);
        element.classList.add('svgmapregion');
        element.addEventListener('click', () => regions[countryName].handleClick());
    });

    

    // Update the table structure to include all rows
    tableManager.updateTableStructure();
    
    // Append the table to the DOM
    document.getElementById('table-container').appendChild(tableManager.table);
}



function createRegionsTable() {
    const table = document.createElement('table');
    table.id = 'regionsTable';

    // Create table header
    const thead = table.createTHead();
    const headerRow = thead.insertRow();
    const headerCell = headerRow.insertCell();
    headerCell.textContent = 'Region Name';

    // Create table body
    const tbody = table.createTBody();

    for (const id in regions) {
        const region = regions[id];
        const row = tbody.insertRow();
        const cell = row.insertCell();
        cell.textContent = region.displayName;
    }

    // Append the table to a container in your HTML
    document.getElementById('region-input-form').appendChild(table);
}


// Call loadMap with the default or a specific map name
loadMap(selectedMap); // Replace 'defaultMapName' with your initial map's name

// Additional functions for zoom, navigation, etc.
