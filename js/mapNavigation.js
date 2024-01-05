let svg; 
let currentZoom = 1;
const zoomFactor = 0.1; // 10% zoom on each click
let originalViewBox; 
let isDragging = false;
let startPoint = { x: 0, y: 0 };


function updateSelectedSVGMap(){
        svg = document.getElementById('map-container').querySelector('svg');
    if (svg) {
        svg.addEventListener('mousedown', startDrag);
        svg.addEventListener('touchstart', startDrag);
        svg.addEventListener('mousemove', drag);
        svg.addEventListener('touchmove', drag);

        originalViewBox = svg.getAttribute('viewBox').split(' ').map(Number); // Initialize this after the SVG is loaded
    } else {
        console.error("SVG element not found");
    }
}

function startDrag(event) {
    isDragging = true;
    startPoint = {
        x: event.type.includes('mouse') ? event.clientX : event.touches[0].clientX,
        y: event.type.includes('mouse') ? event.clientY : event.touches[0].clientY
    };
}



function drag(event) {
    if (!isDragging) return;
    
    let currentPoint = {
        x: event.type.includes('mouse') ? event.clientX : event.touches[0].clientX,
        y: event.type.includes('mouse') ? event.clientY : event.touches[0].clientY
    };

    let dx = (currentPoint.x - startPoint.x) * currentZoom; // Adjust for zoom
    let dy = (currentPoint.y - startPoint.y) * currentZoom;

    let [minX, minY, width, height] = svg.getAttribute('viewBox').split(' ').map(Number);

    svg.setAttribute('viewBox', `${minX - dx} ${minY - dy} ${width} ${height}`);

    startPoint = currentPoint;
}

function endDrag() {
    isDragging = false;
}

window.addEventListener('mouseup', endDrag);
window.addEventListener('touchend', endDrag);



function zoomMap(zoomIn) {
    // Update the current zoom level
    currentZoom = zoomIn ? (currentZoom * (1 + zoomFactor)) : (currentZoom / (1 + zoomFactor));

    // Get the current viewBox values
    let [currentMinX, currentMinY, currentWidth, currentHeight] = svg.getAttribute('viewBox').split(' ').map(Number);

    // Calculate the new width and height based on the current zoom level
    const newWidth = originalViewBox[2] / currentZoom;
    const newHeight = originalViewBox[3] / currentZoom;

    // Calculate the center of the current view
    const centerX = currentMinX + currentWidth / 2;
    const centerY = currentMinY + currentHeight / 2;

    // Calculate the new min-x and min-y to keep the center point the same
    const newMinX = centerX - newWidth / 2;
    const newMinY = centerY - newHeight / 2;

    // Set the new viewBox values
    svg.setAttribute('viewBox', `${newMinX} ${newMinY} ${newWidth} ${newHeight}`);
}



document.getElementById('zoom-in').addEventListener('click', () => zoomMap(true));
document.getElementById('zoom-out').addEventListener('click', () => zoomMap(false));
