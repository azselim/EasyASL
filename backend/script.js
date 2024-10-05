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
