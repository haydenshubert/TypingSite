///////// TYPING FUNCTIONALITY /////////

const input = document.getElementById('words-typed');
let time = 60;  // 60 second timer

function getInput() {
    const input = document.getElementById('words-typed');

    setTimeout(() => {
        input.disabled = true;
        hideElement('clock');
        showElement('redo-prompt');
        showElement('results')
        calculations();
        console.log("You tyepd: ", input.value);///////////////////////////////////////////
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
    const prompt = "Write a 100 word paragraph about this topic: " + document.getElementById('prompt-input').value;
    const wordsTyped = document.getElementById('words-typed');
    const toBeTyped = document.getElementById('to-be-typed');

    toBeTyped.innerText = "Wating for response..."

    console.log(prompt);///////////////////////////////////////////////////////////////////
    console.log("Function was called");///////////////////////////////////////////////

    hideElement('prompt-elements');
    showElement('to-be-typed');

    const res = await fetch('/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    const output = data.response || data.error;

    toBeTyped.innerText = output;
    showElement('words-typed');
    showElement('clock');
    wordsTyped.value = "";
    wordsTyped.disabled = false;
    wordsTyped.focus();
    document.getElementById('prompt-input').value = "";

    input.addEventListener("keydown", handleFirstKeydown);

}

const promptInput = document.getElementById('prompt-input');
promptInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendPrompt();
    }
});

function redoPrompt() {
    showElement('prompt-elements');
    document.getElementById('prompt-input').focus();
    hideElement('to-be-typed');
    hideElement('words-typed');
    hideElement('results');
    hideElement('redo-prompt');
    document.getElementById('timer').innerText = "60";
}

/////// SENDING PROMPT END ////////
