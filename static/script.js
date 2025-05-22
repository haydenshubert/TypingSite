///////// TYPING FUNCTIONALITY /////////

const input = document.getElementById('words-typed');
// input.disabled = true;

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
    }, 60000)   // sets a timer for how long the input box is enabled
}


function startTyping() {
    input.value = "";
    // input.disabled = false;
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
    const prompt = document.getElementById('prompt').value;

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
}

/////// END OF SENDING PROMPT ////////

/////// HIDING ELEMENTS /////////

function showElement(id) {
    document.getElementById(id).classList.remove("hidden");
}

/////// END OF HIDING ELEMENTS //////