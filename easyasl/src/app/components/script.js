//list of possible testing words
const test_words = ["I", "Thirsty", "More"];

//generate word for user to sign
function generateWord() {
    const index = Math.floor(Math.random() * test_words.length);
    return test_words[randomIndex];
}

//display random word
function displayWord() {
    const word = generateWord();
    document.getElementById('randomWord').innerText = word;
}

//

function check_ans(generatedWord, gptWord) {
    const resultElement = document.getElementById('comparisonResult');
    if (generatedWord.toLowerCase() === gptWord.toLowerCase()) {
        resultElement.innerText = "Correct!";
    } else {
        resultElement.innerText = `Incorrect. Expected: ${generatedWord}, but got: ${gptWord}`;
    }
}