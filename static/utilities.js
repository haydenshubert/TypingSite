function timer(timeLeft) {
    const countdown = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(countdown);
        }
    }, 1000); // 1000 for one second intervals
}

/////// CALCULATIONS //////////

function calculations() {
    const targetText = document.getElementById('to-be-typed').innerText.trim();
    const typedText = document.getElementById('words-typed').value.trim();

    const targetWords = targetText.split(/\s+/);    // /\s+/ makes sure extra spaces, tabs, or newlines don't mess up word splitting
    const typedWords = typedText.split(/\s+/);

    const m = targetWords.length;
    const n = typedWords.length;

    const dp = Array.from({ length: m + 1} , () => Array(n + 1).fill(0));

    console.log("Target Text: ", targetText, "Typed Text: ", typedText);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (targetWords[i - 1] === typedWords[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    const correct = dp[m][n];
    const errors = n - correct;
    const grossWPM = typedText.length / 5;  // This does the total characters divided by 5 b/c 5 is the average word length
    const netWPM = Math.max(0, grossWPM - errors);
    const accuracy = n > 0 ? (correct / n) * 100 : 0;

    let displayWPM = 0;
    if (accuracy > 80) {
        displayWPM = grossWPM;
    } else {
        displayWPM = netWPM;
    }

    const calcResults = document.getElementById('results');
    calcResults.innerHTML = `
    <ul style="list-style: none; padding: 0;">
        <li style="margin-bottom: 0.5em;"><strong>WPM:</strong> ${displayWPM.toFixed(2)}</li>
        <li style="margin-bottom: 0.5em;"><strong>Errors:</strong> ${errors}</li>
        <li><strong>Accuracy:</strong> ${accuracy.toFixed(2)}%</li>
    </ul>
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