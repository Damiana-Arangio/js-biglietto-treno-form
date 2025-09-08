/***********************
    ELEMENTI DI INPUT
************************/

// Seleziono elementi di input dal DOM
const nomeCognome = document.getElementById("nome-cognome");
const kmPercorrere = document.getElementById("km-percorrere");
const etaPasseggero = document.getElementById("eta-passeggero");

// Recupero il form per intercettare l'invio
const formBiglietto = document.querySelector('form');


/********************
    EVENTO SUBMIT
*********************/
// Intercetto l'evento d'invio (Bottone "Genera")
formBiglietto.addEventListener ('submit', (event) => {
    event.preventDefault(); // Blocco invio form

    /***********************
        LETTURA VALORI
    ************************/
    // Leggo i valori inseriti dall'utente nel form
    const NomeCognomeValue = nomeCognome.value;
    const kmValue = kmPercorrere.value;
    const etaValue = etaPasseggero.value;

    /******************************
        CALCOLO PREZZO BIGLIETTO
    *******************************/
    const prezzoKm = 0.21;
    let prezzoTotale = prezzoKm * kmValue;

    // Applicazione sconto
    if (etaValue < 18) {
        prezzoTotale = prezzoTotale - (prezzoTotale * 0.20);
    }

    else if (etaValue > 65) {
        prezzoTotale = prezzoTotale - (prezzoTotale * 0.40);
    }

    // Output prezzo biglietto 
    console.log("Costo biglietto: ", prezzoTotale.toFixed(2) + "€");
});

