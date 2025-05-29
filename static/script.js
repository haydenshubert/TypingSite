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
    showElement('clock');
    startTyping();
    input.removeEventListener("keydown", handleFirstKeydown);
}


/////// TYPING FUNCTIONALITY END ///////


/////// SEND PROMPT TO OLLAMA ///////////

async function sendPrompt() {
    console.log("Function was called");///////////////////////////////////////////////
    const prompt = "Write a 100 word paragraph about this topic: " + document.getElementById('prompt-input').value;
    console.log(prompt);///////////////////////////////////////////////////////////////////
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
    showElement('words-typed');  // Has the 'words-typed' id now
    wordsTyped.value = "";
    wordsTyped.disabled = false;
    wordsTyped.focus();
    document.getElementById('prompt-input').value = "";

    input.addEventListener("keydown", handleFirstKeydown);
    hideElement('results');
    hideElement('redo-prompt');
}

const promptInput = document.getElementById('prompt-input');
promptInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendPrompt();
    }
});

/////// SENDING PROMPT END ////////
