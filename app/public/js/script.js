$(document).ready(function () {
    $('select[name="nome_corso"]').select2();
});

// SCRIPT CON LA FUNCTION PER DISABILITARE IL BUTTON QUANDO TUTTI I CAMPI INPUT SONO VUOTI 
function controllaCampi() {

    // dichiariamo delle variabili che indicheranno tutti i campi input

    let campo1 = document.getElementById("campo1").value;

    let campo2 = document.getElementById("campo2").value;

    let campo3 = document.getElementById('campo3').value;

    let button = document.getElementById('btn')

    // immettiamo la condizione che disabilitera il button fin quando almeno uno dei campiinput saranno riempiti
    if (campo1 || campo2 || campo3 !== "") {
        button.disabled = false;
        console.log(button = 'abilitato')
    } else {
        button.disabled = true;
    }
}


// PAGINAZIONE DELLA TABELLA DEI CORSISTI
document.addEventListener('DOMContentLoaded', function () {
    const tableRows = document.querySelectorAll('#example1 tbody tr');
    const rowsPerPage = 6;
    let currentPage = 1;

    function showPage(page) {
        const startIndex = (page - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;

        tableRows.forEach((row, index) => {
            if (index >= startIndex && index < endIndex) {
                row.style.display = 'table-row';
            } else {
                row.style.display = 'none';
            }
        });

        document.getElementById('currentPage').textContent = page;
    }

    function goToPrevPage() {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    }

    function goToNextPage() {
        const numPages = Math.ceil(tableRows.length / rowsPerPage);
        if (currentPage < numPages) {
            currentPage++;
            showPage(currentPage);
        }
    }

    document.getElementById('prevPageBtn').addEventListener('click', goToPrevPage);
    document.getElementById('nextPageBtn').addEventListener('click', goToNextPage);

    // Mostra la prima pagina all'inizio
    showPage(currentPage);
});

