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

async function speechtotext() {
    const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream("xx.mp3"), //add file
    model: "whisper-1",
    });

    console.log(transcription.text);

}

export default speechtotext();
