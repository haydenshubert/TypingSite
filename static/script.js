///////// TYPING FUNCTIONALITY /////////

const input = document.getElementById('words-typed');
const timerDisplay = document.getElementById('timer');
let time = 60;  // 60 second timer


function timer(timeLeft) {
    const countdown = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(countdown);
        }
    }, 1000);
}

function getInput() {
    setTimeout(() => {
        input.disabled = true;
        const inputValue = input.value;
        console.log("You tyepd: ", inputValue);
        showElement('redo-prompt')
    }, 60000)   // sets a timer for how long the input box is enabled
}

function startTyping() {
    input.value = "";
    input.focus();
    timer(time);
    getInput();
}

function handleFirstKeydown(event) {
    startTyping();

    input.removeEventListener("keydown", handleFirstKeydown);
}
input.addEventListener("keydown", handleFirstKeydown);

/////// END OF TYPING FUNCTIONALITY ///////

/////// SEND PROMPT TO OLLAMA ///////////

async function sendPrompt() {
    console.log("Function was called");
    const prompt = document.getElementById('prompt-input').value;
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
    document.getElementById('prompt-input').value = "";
}

const promptInput = document.getElementById('prompt-input');
promptInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendPrompt();
    }
});

/////// END OF SENDING PROMPT ////////

/////// HIDING ELEMENTS /////////

function showElement(id) {
    document.getElementById(id).classList.remove("hidden");
}

function hideElement(id) {
    document.getElementById(id).classList.add("hidden");
}

/////// END OF HIDING ELEMENTS //////