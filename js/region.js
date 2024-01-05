class Region {
    constructor(id) {
        this.id = id;
        this.element = document.getElementById(id) || document.querySelector('.' + id);
        this.displayName = this.formatDisplayName(id);
        this.data = {};
    }

    formatDisplayName(id) {
        // Replace '_x5F_' with a space and remove any remaining underscores
        return id.replace(/_x5F_/g, ' ').replace(/_/g, ' ');
    }


    // New method for handling click events
    handleClick() {
        this.displayInfo();
        this.highlight();
        // You can add more functionality here as needed
    }


     // Method to update the data property
     updateData(key, value) {
        this.data[key] = value;
    }

    // Method to remove a key from the data property when deleting columns
    removeDataKey(key) {
        if (this.data.hasOwnProperty(key)) {
            delete this.data[key];
        }
    }

    displayInfo() {
        const infoDisplay = document.getElementById('info-display');
        infoDisplay.innerHTML = ''; // Clear previous information

        // Create and append elements to display region information
        const nameElement = document.createElement('h3');
        nameElement.textContent = `${this.displayName}`;
        infoDisplay.appendChild(nameElement);

        // Display each data field
        for (const [key, value] of Object.entries(this.data)) {
            const dataElement = document.createElement('p');
            dataElement.textContent = `${key}: ${value}`;
            infoDisplay.appendChild(dataElement);
        }
    }

    highlight() {
        // Remove highlighting from all regions
        document.querySelectorAll('.highlighted-region').forEach(el => {
            el.classList.remove('highlighted-region');
        });

        // Add highlighting to this region
        if (this.element) {
            this.element.classList.add('highlighted-region');
        }
    }

}