import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

export const config = {
    api: {
        bodyParser: {
            sizeLimit: "4mb", // Set desired value here
        },
    },
};

const client = new OpenAI();

// Datatype for the response
type Data = {
    success: boolean;
    failedReason?: any;
    answer: any;
};

// Our custom instructions for the chatbot
const INSTRUCTIONS =
    'You are a grammar and sentence readability corrector. You will receive multiple words which may or may not be grammatically correct and/or readable. Your job is to improve this sentence by adding proper grammar and making the sentence more readable. Do not change the actual meaning of the multiple words provided. ';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    const raw = req.body;

    // Assuming 'words' will come directly from the body in a normal format
    const { words } = req.body;

    // Join the words into a single string for the prompt
    if (!words || !Array.isArray(words) || words.length === 0) {
        res.status(400).json({
            success: false,
            failedReason: "No words provided",
            answer: "",
        });
        return;
    }
    
    const userWords = words.join(" ");

    // Decoding the base64 string (if still needed)
    const b64 = decodeURIComponent(JSON.parse(raw).base64 as string);

    if (b64 === undefined) {
        res.status(400).json({
            success: false,
            failedReason: "No url provided",
            answer: "",
        });
        return;
    }

    // Getting the actual AI answer
    client.chat.completions
        .create({
            model: "gpt-4-vision-preview",
            messages: [
                {
                    role: "system",
                    content: INSTRUCTIONS,
                },
                {
                    role: "user",
                    content: `Here are the words: "${userWords}". Please correct the sentence by making it grammatically correct and readable.`,
                },
            ],
            max_tokens: 1000,
        })
        .then((completion) => {
            const rawAnswer = completion.choices[0].message.content as string;

            const answer = JSON.parse(
                rawAnswer.substring(7, rawAnswer.length - 4),
            );

            res.status(200).json({
                success: true,
                answer: answer,
            });
        })
        .catch((reason) => {
            res.status(404).json({
                success: false,
                failedReason: reason,
                answer: "",
            });
        });
}