import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

let total = 0
let correct = 0
let pct = 0

export default () => (
  <Popup trigger={<button> How To </button>} position="right center">
    <div>Welcome to the certification section!</div>
    <div>We're so happy to have you. In order to become certified, you must pass with <strong> 80% </strong> accuracy.</div>
    <div>Welcome to the certification section!</div>
  </Popup>
);
    
for (let i = 0; i < 11; i++){

    const wordbank = ["i", "you", "?", "thirsty", "more", "good", "bad", "hello", "want", "more"]
let randomNumber = Math.floor(Math.random()*11)
let randomWord = wordbank[randomNumber]
document.write("Please sign " + "/" + randomWord + "/")
    // Access API 

        const resultElement = document.getElementById('comparisonResult');
        if (generatedWord.toLowerCase() === gptWord.toLowerCase()) {
            resultElement.innerText = "Correct!";
            return (resultElement.innerText);
        } else {
            resultElement.innerText = `Incorrect. Expected: ${generatedWord}, but got: ${gptWord}`;
            return (resultElement.innerText);
        }

    const counttotal = document.getElementById("total")
    const countcorrect = document.getElementById("correct")

    if (resultElement.innerText = "Correct!") {
        total = total++;
        correct = correct++;
        countcorrect.textContent = correct
        document.write("/")
        counttotal.textContent = total
        
        
    } else {
        total = total++;
        countElement.textContent = count
        countElement.textContent = count
        countcorrect.textContent = correct
        document.write("/")
        counttotal.textContent = total
    }
}

    pct = correct/total;
    if (pct >= 0.8) {
        document.write("You passed!")
        //redirect to blockchain certificate page
    } else {
        document.write("You failed. Please refresh the page and try again!")
    }




    