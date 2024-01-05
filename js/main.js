
// Load a different map
const selectElement = document.getElementById("map-selection");

selectElement.addEventListener("change", function() {
    const selectedValue = this.value;
    loadMap(selectedValue);
});


//modal for user guide
var modal = document.getElementById("userGuideModal");
var btn = document.getElementById("openUserGuide");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    fetch('user-guide.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('modal-content').innerHTML = data;
            modal.style.display = "block";
        });
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == document.getElementById('userGuideModal')) {
        modal.style.display = "none";
    }
    if (event.target == document.getElementById('model-content')) {
        modal.style.display = "none";
    }
}