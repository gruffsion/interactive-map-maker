class TableManager {
    constructor() {
        this.table = document.createElement('table');
        this.table.id = 'regionsTable';
        this.columns = ['Region Name']; // Start with just the region name column
        this.createHeaders();
    }

    createDeleteColumnButton(columnName) {
        const button = document.createElement('button');
        button.textContent = 'Delete';
        button.className = 'delete-button'; 
        button.onclick = () => this.deleteColumn(columnName);
        return button;
    }

    deleteColumn(columnName) {
        if (confirm(`Are you sure you want to delete the column '${columnName}'?`)) {
            const index = this.columns.indexOf(columnName);
            if (index > -1) {
                this.columns.splice(index, 1); // Remove the column from columns array

                // Remove data corresponding to the deleted column in each Region
                Object.values(regions).forEach(region => {
                    region.removeDataKey(columnName);
                });

                this.updateTableStructure();   // Update the table
            }
        }
    }

    createHeaders() {
        const thead = this.table.createTHead();
        const headerRow = thead.insertRow();
    
        this.columns.forEach(columnName => {
            const headerCell = document.createElement('th');
            headerCell.textContent = columnName;
    
            if (columnName !== 'Region Name') {
                const deleteButton = this.createDeleteColumnButton(columnName);
                headerCell.appendChild(deleteButton);
            }
    
            headerRow.appendChild(headerCell);
        });
    
        const addColumnCell = headerRow.insertCell();
        addColumnCell.appendChild(this.createAddColumnButton());
    }

    createAddColumnButton() {
        const button = document.createElement('button');
        button.textContent = 'Add Column';
        button.addEventListener('click', () => this.promptForNewColumn());
        return button;
    }

    promptForNewColumn() {
        const columnName = prompt('Enter name for new column:');
        if (columnName) {
            this.addColumn(columnName);
        }
        event.preventDefault()
    }

    addColumn(columnName) {
        this.columns.push(columnName);
        this.updateTableStructure();
    }

    updateTableStructure() {
        // Clear and recreate the headers and rows
        this.table.innerHTML = '';
        this.createHeaders();
        Object.values(regions).forEach(region => {
            const row = this.createTableRow(region);
            this.table.appendChild(row);
        });
    }


    createTableRow(region) {
        const row = document.createElement('tr');
        this.columns.forEach(columnName => {
            const cell = document.createElement('td');
            if (columnName === 'Region Name') {
                cell.textContent = region.displayName;
            } else {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = region.data[columnName] || '';
                input.onchange = (e) => region.data[columnName] = e.target.value;
                cell.appendChild(input);
            }
            row.appendChild(cell);
        });
        return row;
    }

}
