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
        if (trialNumber == 0) return alert("Trial Over");;
        trialNumber--;
        console.log("Wail Validating...");
        const desiredWord = await wordOfTheDay();
        if (desiredWord == inputWord){
            alert("You Won!!!")
            return console.log("Win");
        }
        else {
            if (trialNumber > 0) getWordFromUser();
            if (trialNumber == 0) return alert("Trial Over");
            console.log("Retry");
        }
    } else {
        if (trialNumber == 0) return alert("Trial Over");;
        if (trialNumber > 0) getWordFromUser();
        console.log("Invalid Word!");
    }
}

function getWordFromUser() {
    console.log("Tral Remaining: " + trialNumber);
    const gWord = prompt("Guess the word: ").toLocaleLowerCase();
    validator(gWord);
}

getWordFromUser();