import fs from "fs";
import path from "path";
import OpenAI from "openai";
import type { NextApiRequest, NextApiResponse} from 'next';
// @ts-ignore
import dotenv from "dotenv";

dotenv.config();

//initialize openai
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default async function speechtotext(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Wrong method' });
    }
    
    try {
        const filePath = path.resolve('');
        const transcription = await openai.audio.transcriptions.create({
            file: fs.createReadStream(""), //file
            model: "whisper-1",
        });

        transcription.text

        res.status(200).json({ message: 'Success! Audio saved.', filePath });
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ error: 'Internal Error'});
    }
    }
