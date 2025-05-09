    const input = document.getElementById('words-typed');
    const timerDisplay = document.getElementById('timer');
    let time = 10;

    function timer(timeLeft) {
        // Countdown interval
        const countdown = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(countdown); // Stop the countdown
        }
        }, 1000);
    }

    function getInput() {
        // Main timer: fire once after 10 seconds
        setTimeout(() => {
        input.disabled = true; // Disable input
        const inputValue = input.value;
        console.log("You typed:", inputValue);
        alert("Time's up! Check the console.");
        }, 10000);
    }
    timer(time);
    getInput();
