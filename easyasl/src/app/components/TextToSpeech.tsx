import fs from "fs";
import path from "path";
import OpenAI from "openai";
import type { NextApiRequest, NextApiResponse} from 'next';
// @ts-ignore
import dotenv from "dotenv";

dotenv.config();

//audio from text
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default async function speechtotext(req: NextApiRequest, res: NextApiResponse) {
    try {
        const filePath = path.resolve('');
        const mp3 = await openai.audio.speech.create({
            model: 'tts-1',
            voice: 'fable',
            input: '' //add here
        });

        const buffer = Buffer.from(await mp3.arrayBuffer());
        await fs.promises.writeFile(filePath, buffer);

        res.status(200).json({ message: 'Success! Audio saved.', filePath });
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ error: 'Internal Error'});
    }
    }
