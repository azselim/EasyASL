// Api route for converting images to base64

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
    'You are a master ASL interpreter. You will be first presented with single word, followed by a set of two images. For each word, the following set of 2 photos represents 2 motions that correspond to said word in ASL. This acts as a dictionary to help you accurately identify and interpret ASL signs. At the end of the dictionary, you will provided with a one word instruction: INTERPRET. This will be followed by two images representing an ASL sign, and you must use your attained knowledge from the dictionary to correctly idenitify and intepret the sign, returning the word in the following JSON format: {"word": ""}.';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    const raw = req.body;
    // Decoding the base64 string
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
                    content: [
                        {
                            type: "text",
                            text: "Use the following image to create a list of flashcards.",
                        },
                        {
                            type: "image_url",
                            image_url: {
                                url: b64,
                            },
                        },
                    ],
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
