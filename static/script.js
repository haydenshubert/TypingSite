///////// TYPING FUNCTIONALITY /////////

const input = document.getElementById('words-typed');
const timerDisplay = document.getElementById('timer');
let time = 60;  // 60 second timer

// Counts down by one from the given 'timeLeft' until it reaches zero
function timer(timeLeft) {
    const countdown = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(countdown);   // stops the countdown
        }
    }, 1000);
}

// The contents inside the function happens after the set time before the last paranthese
function getInput() {
    setTimeout(() => {
        input.disabled = true;
        const inputValue = input.value;
        console.log("You tyepd: ", inputValue);
    }, 60000)   // sets a timer for how long the input box is enabled
}


function startTyping() {
    input.value = "";   // sets input value to empty
    input.focus();      // focuses on textarea box
    timer(time);        // calls the timer for countdown
    getInput();         // disables the textarea and gets the value after set time
}

// Calls the startTyping() function then removes the keydown listener so it doesn't keep calling the function from every keydown
function handleFirstKeydown(event) {
    startTyping();  

    input.removeEventListener("keydown", handleFirstKeydown);
}
input.addEventListener("keydown", handleFirstKeydown);  // Listens for keydown then calls the function

/////// END OF TYPING FUNCTIONALITY ///////

/////// SEND PROMPT TO OLLAMA ///////////

async function sendPrompt() {       // async functions can use await to pause for things like HTTP requests
    console.log("Function was called");
    const prompt = document.getElementById('prompt').value;     // gets the text inside of the input box

    const res = await fetch('/ask', {   // uses fetch API to send a post request to the flask endpoint at '/ask' and await pauses until request is finished
        method: 'POST',     // use post because we are sending data to the server
        headers: {          // tells flask that we are sending JSON not plain text
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })    // wraps the prompt variable in a javascript object which converts it to a JSON string which flask expects
    });

    const data = await res.json();
    const output = data.response || data.error;

    document.getElementById('to-be-typed').innerText = output;
    showElement('words-typed')  // Reveals the 'words-typed' element
}

/////// END OF SENDING PROMPT ////////

/////// HIDING ELEMENTS /////////

function showElement(id) {
    document.getElementById(id).classList.remove("hidden");     // Removes the hidden class from the element of a given id
}

/////// END OF HIDING ELEMENTS //////