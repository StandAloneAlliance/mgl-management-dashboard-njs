$(document).ready(function () {
    $('select[name="nome_corso"]').select2();
});


// RECUPERO TUTTI I DELETE_BUTTON DI OGNI PRODOTTO
const customerDeleteButton = document.querySelectorAll('.customer-delete-button');

// CICLO L'ARRAY CONTENENTE TUTTI I DELETE_BUTTON
customerDeleteButton.forEach((button) => {

    // PER OGNI DELETE_BUTTON, AGGIUNGO UN EVENT_LISTENER "CLICK"
    button.addEventListener('click', (event) => {

        // QUANDO L'UTENTE CLICCA SUL DELETE_BUTTON, IL FORM NON VIENE AVVIATO GRAZIE A QUESTO COMANDO
        event.preventDefault();

        // QUANDO L'UTENTE CLICCA SUL DELETE_BUTTON, MI VIENE PASSATO UN DATA ATTRIBUTE, LO RECUPERO TRAMITE QUESTA STRINGA
        const customerName = button.getAttribute('data-customer-name');

        // RECUPERO IL TAG HTML DELLA MODALE DOVE INSERIRE IL DATA ATTRIBUTE RECUPERATO PRIMA
        const modalCustomerName = document.getElementById('modal-customer-name');

        // INSERISCO IL DATA ATTRIBUTE DENTRO IL "MODAL_PRODUCT_NAME"
        modalCustomerName.innerText = customerName;

        // RECUPERO L'HTML DELLA MODALE "MODAL_PRODUCT_DELETE", DALLA VIEW ADMIN -> PARTIALS
        const modal = document.getElementById('customerConfirmDeleteModal');

        // CREO LA MODALE COME OGGETTO DI BOOTSTRAP, PARTENDO DALL'HTML DELLA MODALE RECUPERATA PRIMA
        const bootstrapModal = new bootstrap.Modal(modal);

        // QUANDO L'UTENTE CLICCA NEL DELETE_BUTTON, MOSTRO LA "BOOTSTRAP_MODAL"
        bootstrapModal.show();

        // RECUPERO IL PULSANTE DI "CONFERMA CANCELLAZIONE" PRESENTE NELLA MODALE
        const customerConfirmDeleteButton = document.getElementById('customer-confirm-delete-button');

        // AL PULSANTE DI "CONFERMA CANCELLAZIONE", AGGIUNGO UN EVENT_LISTENER "CLICK"
        customerConfirmDeleteButton.addEventListener('click', () => {

            // QUANDO L'UTENTE CLICCA IL PULSANTE DI "CONFERMA CANCELLAZIONE", RECUPERO IL "DELETE_BUTTON", ED ESEGUO LA FORM DI CANCELLAZIONE
            button.submit();
        })
    })
})


