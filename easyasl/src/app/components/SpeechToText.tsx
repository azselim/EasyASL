import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function speechtotext() {
    const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream("xx.mp3"), //add file
    model: "whisper-1",
    });

    console.log(transcription.text);

    }   

    speechtotext();


export default speechtotext;