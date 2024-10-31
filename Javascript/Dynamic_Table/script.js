
document.getElementById('generate').addEventListener('click', function(){
    const rows = parseInt(document.getElementById('rows').value);
    const columns = parseInt(document.getElementById('cols').value);

    const tableContainer = document.getElementById('tableContainer')

    tableContainer.innerHTML = '';
    if (isNaN(rows) || isNaN(columns)){
        alert("Fill in the valid number!");
        return;
    }
    console.log(rows);
    console.log(columns);
    const table = document.createElement('table');
    for (let i = 0; i < rows; i++) {
        const tr = document.createElement('tr'); 
        for (let j = 0; j < columns; j++) {
            const td = document.createElement('td'); 
            td.textContent = `(${i+1}, ${j+1})`;  
            tr.appendChild(td);
        }
        table.appendChild(tr)
    }
    tableContainer.appendChild(table);
})

