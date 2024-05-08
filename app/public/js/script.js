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

