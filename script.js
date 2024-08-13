let options = [];

function addOption() {
    const optionInput = document.getElementById('optionInput');
    const option = optionInput.value.trim();
    if (option) {
        options.push(option);
        displayOptions();
        optionInput.value = '';
    }
}

function displayOptions() {
    const optionsList = document.getElementById('optionsList');
    optionsList.innerHTML = '';
    options.forEach((option, index) => {
        const div = document.createElement('div');
        div.style.display = 'flex';
        div.style.justifyContent = 'space-between';
        div.style.alignItems = 'center';

        const optionText = document.createElement('span');
        optionText.textContent = `${index + 1}. ${option}`;
        div.appendChild(optionText);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Rimuovi';
        removeButton.style.marginLeft = '10px';
        removeButton.onclick = () => removeOption(index);
        div.appendChild(removeButton);

        optionsList.appendChild(div);
    });
}

function removeOption(index) {
    options.splice(index, 1);
    displayOptions();
}


function startDraw() {
    const numDraws = parseInt(document.getElementById('numDraws').value);
    if (numDraws > 0 && numDraws <= 30) {
        const dice = document.querySelector('.dice');
        dice.style.display = 'block'; // Mostra il dado

        setTimeout(() => {
            const results = [];
            for (let i = 0; i < numDraws; i++) {
                const randomIndex = Math.floor(Math.random() * options.length);
                results.push(options[randomIndex]);
            }
            dice.style.display = 'none'; // Nascondi il dado dopo l'animazione
            displayResults(results);
            displayMostFrequent(results);
        }, 1500); // 1.5 secondi di animazione del dado
    } else {
        alert("Per favore, inserisci un numero valido di estrazioni (1-30).");
    }
}




function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<h3>Risultati delle Estrazioni:</h3>';
    results.forEach((result, index) => {
        const div = document.createElement('div');
        div.textContent = `${index + 1}. ${result}`;
        resultsDiv.appendChild(div);
    });
}

function displayMostFrequent(results) {
    const frequency = {};
    results.forEach(result => {
        frequency[result] = (frequency[result] || 0) + 1;
    });

    let mostFrequent = null;
    let maxFrequency = 0;
    for (const option in frequency) {
        if (frequency[option] > maxFrequency) {
            mostFrequent = option;
            maxFrequency = frequency[option];
        }
    }

    const mostFrequentDiv = document.getElementById('mostFrequent');
    mostFrequentDiv.innerHTML = `<h3>Opzione più frequente:</h3><div>${mostFrequent} (${maxFrequency} volte)</div>`;
}
