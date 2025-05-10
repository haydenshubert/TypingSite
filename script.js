// This is all for testing out functions that should be used for typing part of website

    // This is the const that holds the words typed in the input box
    const input = document.getElementById('words-typed');
    input.disabled = true; // Disable input until the button is clicked to call startTyping() func

    // This is the const that changes as time goes down
    const timerDisplay = document.getElementById('timer');
    let time = 10;  // the set time allowed for typing

    // Functon for counting down the timer 
    function timer(timeLeft) {
        // Countdown interval
        const countdown = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(countdown); // Stop the countdown when zero is reached
        }
        }, 1000);   // one second interval
    }
    
    // After timer is up, this function disables the input box and gets the words typed in the box
    function getInput() {
        setTimeout(() => {
        input.disabled = true; // Disable input
        const inputValue = input.value;
        console.log("You typed:", inputValue);  // displays in console for now
        }, 10000);
    }

    // Enables typing in the input box and starts the timer/getInput functions
    function startTyping() {
        input.disabled = false; // enable input
        timer(time);
        getInput();
    }

