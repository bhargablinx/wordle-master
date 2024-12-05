const getUrl = "https://words.dev-apis.com/word-of-the-day";
const postUrl = "https://words.dev-apis.com/validate-word";
let trialNumber = 6;

async function wordOfTheDay() {
    let response = await fetch(getUrl);
    response = await response.json();
    const word = response.word;
    return word;
}

async function validator(inputWord) {
    let response = await fetch(postUrl, { //checks wheather our input word is valid by sending a post request to the api
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({word: inputWord})
    });


    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    response = await response.json()
    response = response.validWord;
    
    if (response) {
        trialNumber--;
        console.log("Wail Validating...");
        const desiredWord = await wordOfTheDay();
        if (desiredWord == inputWord)
            return console.log("Win");
        else {
            console.log("Retry");
        }
    } else {
        console.log("Invalid Word!");
    }
}

validator("glint");