

async function fetchCssContent(urls) {
    let content = '';
    for (const url of urls) {
        const response = await fetch(url);
        content += await response.text() + '\n';
    }
    return content;
}

async function fetchJsContent(url) {
    try {
        const response = await fetch(url);
        return await response.text();
    } catch (error) {
        console.error('Error fetching JavaScript content:', error);
        return '';
    }
}

async function exportMapAsHtml() {
    let infoDisplay = document.getElementById('info-display');
    infoDisplay.textContent = ''
    let activeElement = document.querySelector('.highlighted-region');
        if (activeElement){
        activeElement.classList.remove('highlighted-region');
        }
    const cssUrls = ['css/mapStyles.css', 'css/infoDisplayStyles.css'];
    const cssStyles = await fetchCssContent(cssUrls);
    const jsonData = JSON.stringify(regions); // Stringify regions data
    const jsContent = await fetchJsContent('js/mapNavigation.js');
    const mapHtml = document.getElementById('export-container-parent').innerHTML;

    // JavaScript code for interactivity as a string


    const exportHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Exported Map</title>
            <style>${cssStyles}</style>
        </head>
        <body>
            ${mapHtml}
            <div id="info-display"></div>
            <script>
            ${jsContent} 

    // Initialize regionsData
    const regionsData = ${jsonData};


   
    // Wait for the DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', () => {
        // Attach click event listeners to each region
        for (const regionKey in regionsData) {
            if (regionsData.hasOwnProperty(regionKey)) {
                const region = regionsData[regionKey];
                const regionElement = document.getElementById(region.id);
                if (regionElement) {
                    regionElement.addEventListener('click', () => {
                        displayRegionInfo(region);
                    });
                } else {
                    console.error('Element not found for region ID:', region.id);
                }
            }
        }
    });

    // Function to display region information
    function displayRegionInfo(region) {
        const infoDisplay = document.getElementById('info-display');
        if (!infoDisplay) return;

        infoDisplay.innerHTML = '';

        const nameElement = document.createElement('h3');
        nameElement.textContent = region.displayName;
        infoDisplay.appendChild(nameElement);

        Object.entries(region.data).forEach(([key, value]) => {
            const dataElement = document.createElement('p');
            dataElement.textContent = key + ': ' + value;
            infoDisplay.appendChild(dataElement);
        });
        highlight(region);
    }


    function highlight(region){
        // Remove highlighting from all regions
        document.querySelectorAll('.highlighted-region').forEach(el => {
            el.classList.remove('highlighted-region');
        });

        higlightedElement = document.getElementById(region.id);

        // Add highlighting to this region
        higlightedElement.classList.add('highlighted-region');
        
    }
    
    updateSelectedSVGMap()

</script>

        </body>
        </html>
    `;

    downloadToFile(exportHtml, 'exported_map.html', 'text/html');
}



// Helper function to trigger download
function downloadToFile(content, filename, contentType) {
    const a = document.createElement('a');
    const file = new Blob([content], { type: contentType });
    
    a.href= URL.createObjectURL(file);
    a.download = filename;
    a.click();

    URL.revokeObjectURL(a.href);
}

document.getElementById('export-map-button').addEventListener('click', exportMapAsHtml);
