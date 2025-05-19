async function sendPrompt() {   // async functions can use await to pause for things like HTTP requests
    console.log("Function was called");
    const prompt = document.getElementById('input-prompt').value;   // gets the text inside of the input box

    const res = await fetch('/ask', {   // uses fetch API to send a post request to the flask endpoint at /ask // await pauses until request is finished
        method: 'POST',    // use post because we are sending data to the server
        headers: {      // tells flaks that we are sending JSON not plain text
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })    // wraps the prompt variable in a javascript object which converts it to a JSON string which flask expects
    });

    const data = await res.json();
    const output = data.response || data.error;

    document.getElementById('to-be-typed').innerText = output;
}