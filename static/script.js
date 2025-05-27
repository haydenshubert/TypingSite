///////// TYPING FUNCTIONALITY /////////

const input = document.getElementById('words-typed');
let time = 60;  // 60 second timer


function timer(timeLeft) {
    const countdown = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(countdown);
        }
    }, 1000); // 1000 for one second intervals
}

function getInput() {
    const input = document.getElementById('words-typed');

    setTimeout(() => {
        input.disabled = true;
        console.log("You tyepd: ", input.value);///////////////////////////////////////////
        showElement('redo-prompt');
        calculations();
    }, 60000);   // sets a timer for how long the input box is enabled (minute = 60000)
}

function startTyping() {
    timer(time);
    getInput();
}

function handleFirstKeydown(event) {
    startTyping();
    input.removeEventListener("keydown", handleFirstKeydown);
}


/////// TYPING FUNCTIONALITY END ///////



/////// SEND PROMPT TO OLLAMA ///////////

async function sendPrompt() {
    console.log("Function was called");///////////////////////////////////////////////
    const prompt = document.getElementById('prompt-input').value;
    const wordsTyped = document.getElementById('words-typed');
    hideElement('prompt-elements');
    const res = await fetch('/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    const output = data.response || data.error;

    document.getElementById('to-be-typed').innerText = output;
    showElement('words-typed')  // Has the 'words-typed' id now
    wordsTyped.value = "";
    wordsTyped.disabled = false;
    wordsTyped.focus();
    document.getElementById('prompt-input').value = "";
//
    input.addEventListener("keydown", handleFirstKeydown);
//
}

const promptInput = document.getElementById('prompt-input');
promptInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendPrompt();
    }
});

/////// SENDING PROMPT END ////////



/////// CALCULATIONS //////////

function calculations() {
    const targetText = document.getElementById('to-be-typed').innerText.trim();
    const typedText = document.getElementById('words-typed').value.trim();

    const targetWords = targetText.split(/\s+/);    // /\s+/ makes sure extra spaces, tabs, or newlines don't mess up word splitting
    const typedWords = typedText.split(/\s+/);

    const comparisonLength = typedWords.length;
    let errors = 0;

    console.log("Target Text: ", targetText, "Typed Text: ", typedText, comparisonLength, errors);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
    for (let i = 0; i < comparisonLength; i++) {
        if (typedWords[i] !== targetWords[i]) {
            errors++;
        }
    }

    const correct = comparisonLength - errors;
    const grossWPM = typedText.length / 5;  // This does the total characters divided by 5 b/c 5 is the average word length
    const netWPM = Math.max(0, grossWPM - errors);
    const accuracy = comparisonLength > 0 ? (correct / comparisonLength) * 100 : 0; // short if statement

    let displayWPM = 0;
    if (accuracy > 80) {
        displayWPM = grossWPM;
    } else {
        displayWPM = netWPM;
    }

    const calcResults = document.getElementById('results');
    calcResults.innerHTML = `
    <h2>Results</h2>
    <p><strong>WPM:</strong> ${displayWPM.toFixed(2)}</p>
    <p><strong>Errors:</strong> ${errors}</p>
    <p><strong>Accuracy:</strong> ${accuracy.toFixed(2)}%</p>
    `;
    console.log("Gross WPM: ", grossWPM);////////////////////////////////////////////////////////
    console.log("Net WPM: ", netWPM);/////////////////////////////////////////////////////////
    console.log("Errors: ", errors);//////////////////////////////////////////////////////////
    console.log("Accuracy: ", accuracy);///////////////////////////////////////////////////////
}

/////// CALCULATIONS END //////////



/////// HIDING ELEMENTS /////////

function showElement(id) {
    document.getElementById(id).classList.remove("hidden");
}

function hideElement(id) {
    document.getElementById(id).classList.add("hidden");
}

/////// HIDING ELEMENTS END //////