import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default () => (
  <Popup trigger={<button> Trigger </button>} position="right center">
    <div>Instructions</div>
  </Popup>
);
    
const wordbank = ["i", "you", "?", "thirsty", "more", "good", "bad", "hello", "want", "more"]
let randomNumber = Math.floor(Math.random()*11)
let randomWord = wordbank[randomNumber]
document.write("Please sign " + "/" + randomWord + "/")

    // Access API 