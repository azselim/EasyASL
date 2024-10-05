import fs from "fs";
import path from "path";
import OpenAI from "openai";

//audio from text
const openai = new OpenAI();

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
