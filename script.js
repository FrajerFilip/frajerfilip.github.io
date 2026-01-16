let jmeno_hrace = "";
let mam_itic = false;

function spustitHru() {
    let vstup = prompt("Zadej své jméno:");

    if (vstup && vstup.length > 0) {
        jmeno_hrace = vstup + ".";
    } else {
        jmeno_hrace = "Neznámý.";
    }

    vykresliScenu(1);
}

function vykresliScenu(cislo) {
    let textElement = document.getElementById("vypis-pribehu");
    let tlacitkaElement = document.getElementById("ovladaci-prvky");

    // SCÉNA 1: Rozcestí
    if (cislo === 1) {
        textElement.innerHTML = "Vítej, " + jmeno_hrace + " Jsi u jídelny na Weilovce. Musíš se rozhodnout, kudy dál.";
        tlacitkaElement.innerHTML = `
            <button onclick="vykresliScenu(2)">Půjdeš na novou budovu. (vlevo)</button>
            <button onclick="vykresliScenu(3)">Půjdeš k východu. (rovně)</button>
            <button onclick="vykresliScenu(5)">Půjdeš na starou budovu. (vpravo)</button>
        `;
    } 
    
    // SCÉNA 2: Archiv (Získání předmětu)
    else if (cislo === 2) {
        mam_itic = true;
        textElement.innerHTML = "Na nové budově najdeš ITIC se kterým si můžeš otevřít dveře ven.";
        tlacitkaElement.innerHTML = '<button onclick="vykresliScenu(1)">Zpět k jídelně</button>';
    }

    // SCÉNA 3: Východ (Rozhodování o výhře/prohře)
    else if (cislo === 3) {
        if (mam_itic === true) {
            // Máš ITIC -> jdeš na výhru (scéna 4)
            vykresliScenu(4);
        } else {
            // Nemáš ITIC -> jdeš na prohru (scéna 6)
            vykresliScenu(6);
        }
    }

    // --- KONEC 1: VÝHRA ---
    else if (cislo === 4) {
        textElement.innerHTML = "Skvělá práce, " + jmeno_hrace + " Díky ITICU jsi otevřel dveře a úspěšně utekl na svobodu!";
        tlacitkaElement.innerHTML = '<button onclick="location.reload()">Hrát znovu</button>';
    }

    // --- SCÉNA 5: Ventilace (Cesta k prohře 2) ---
    else if (cislo === 5) {
        textElement.innerHTML = "Bohužel si cestou na starou budovu narazil na školníka a ten tě zadržel.";
        tlacitkaElement.innerHTML = '<button onclick="vykresliScenu(7)">Bránit se.</button>';
    }

    // --- KONEC 2: PROHRA (Zajetí) ---
    else if (cislo === 6) {
        textElement.innerHTML = "Dorazil jsi ke dveřím ale všimla si tě recepční a zavolala školníka, který tě chytil. Útěk neúspěšný.";
        tlacitkaElement.innerHTML = '<button onclick="location.reload()">Zkusit znovu</button>';
    }

    // --- KONEC 3: PROHRA (Ztracen) ---
    else if (cislo === 7) {
        textElement.innerHTML = "Bohužel školník má nářadí a ním tě uhodil a jsi v bezvědomí. Útěk neúspěšný.";
        tlacitkaElement.innerHTML = '<button onclick="location.reload()">Restartovat</button>';
    }
}