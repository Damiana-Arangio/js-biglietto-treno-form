/***************
   DEFINIZIONI
****************/

// Seleziono elementi di input dal DOM
const nomeCognome = document.getElementById("nome-cognome");
const kmPercorrere = document.getElementById("km-percorrere");
const etaPasseggero = document.getElementById("eta-passeggero");

// Seleziono elementi di output (biglietto) dal DOM
const outputNome = document.getElementById("output-nome");
const outputOfferta = document.getElementById("output-offerta");
const outputCarrozza = document.getElementById("output-carrozza");
const outputCP = document.getElementById("output-cp");
const outputPrezzoBiglietto = document.getElementById("output-prezzo-biglietto");

// Recupero il form per intercettare l'invio
const formBiglietto = document.querySelector('form');


/********************
    EVENTO SUBMIT
*********************/
// Intercetto l'evento d'invio (click su bottone genera/annulla)
formBiglietto.addEventListener ('submit', (event) => {
    event.preventDefault(); // Blocco invio automatico del form

    /************
        INPUT
    *************/
    // Leggo i valori inseriti dall'utente nel form
    let nomeCognomeValue = nomeCognome.value;
    let kmValue = Number(kmPercorrere.value);           // conversione stringa -> decimale
    let etaValue = parseInt(etaPasseggero.value);       // conversione stringa -> num int

    /*****************
        ELABORAZIONE
    ******************/

    // Chiamate funzioni -> utili per l'inserimento di alcuni dati 
    let prezzoBiglietto = scontoBiglietto(etaValue, kmValue);
    let numCarrozza = numGenRandom(1, 100);
    let numCP = numGenRandom(1000, 5000);
    let offerta = tipoOfferta(etaValue);
    
    /************
        OUTPUT
    *************/

    // Recupero elementi dal DOM usati per gestire biglietto e bottoni
    const biglietto = document.getElementById("sezione-biglietto"); 
    const bottoneCliccato = event.submitter.id;                                 // id del bottone che ha inviato il form 
    const bottoneGenera = document.getElementById("bottone-genera");
    const bottoneAnnulla = document.getElementById("bottone-annulla");

    // GESTIONE BOTTONE GENERA
        if (bottoneCliccato === "bottone-genera") {

            // Controllo se i campi sono vuoti
            if (nomeCognome.value.trim() === "" || kmPercorrere.value.trim() === "" || etaPasseggero.value.trim() === "") {
                alert ("Compila i campi!");
                nomeCognome.required = true;
                kmPercorrere.required = true;
                etaPasseggero.required = true;
            }

            else {
                // Compila biglietto
                outputNome.innerText = nomeCognomeValue;
                outputOfferta.innerText = offerta;
                outputCarrozza.innerText = numCarrozza;
                outputCP.innerText = numCP;
                outputPrezzoBiglietto.innerText = prezzoBiglietto.toFixed(2) + " €";

                // Rendi visibile il biglietto
                biglietto.classList.remove("d-none");

                // Disabilita/Abilita bottoni
                bottoneGenera.disabled = true;
                bottoneAnnulla.disabled = false;
            }   
        }

        // GESTIONE BOTTONE ANNULLA
        else {

            // Svuota campi form
            event.target.reset();

            // Nascondi biglietto
            biglietto.classList.add("d-none");

            // Disabilita/Abilita bottoni
            bottoneGenera.disabled = false;
            bottoneAnnulla.disabled = true;
        }
});


/**************
    FUNZIONI
***************/

// Applicazione sconto biglietto in base all'età
function scontoBiglietto( eta, km) {

    const prezzoKm = 0.21;
    let prezzoTotale = prezzoKm * km;
    let offerta = "";

    // Applicazione sconto
    if (eta < 18) {
        prezzoTotale = prezzoTotale - (prezzoTotale * 0.20);
        offerta = "under 18";
    }

    else if (eta > 65) {
        prezzoTotale = prezzoTotale - (prezzoTotale * 0.40);
        offerta = "over 65";

    }
    return prezzoTotale;
}

function tipoOfferta(eta) {

    let offerta = "Standard";

    // Applicazione sconto
    if (eta < 18) {
        offerta = "Under 18";
    }

    else if (eta > 65) {
        offerta = "Over 65";

    }
    return offerta;
}

// Generazione numero casuale
function numGenRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}