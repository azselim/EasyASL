import fs from "fs";
import path from "path";
import OpenAI from "openai";
// @ts-ignore
import dotenv from "dotenv";

dotenv.config();

//audio from text
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const speechFile = path.resolve("./speech.mp3");

async function texttospeech() {
    try {
        const mp3 = await openai.audio.speech.create({
            model: "tts-1",
            voice: "fable",
            input: "" //add input
        });
    
    console.log(speechFile);
    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.promises.writeFile(speechFile, buffer);
    console.log("Audio saved successfully.")}
    catch(error) {
        console.error("Error occured", error);
    }
}
texttospeech();

async function speechtotext() {
    const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream("xx.mp3"), //add file
    model: "whisper-1",
    });

    console.log(transcription.text);

}
speechtotext();

default export