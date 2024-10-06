import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Ensure OpenAI API Key is set correctly
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error('The OPENAI_API_KEY environment variable is missing.');
}

const client = new OpenAI({ apiKey });

// Custom instructions for the OpenAI model
const INSTRUCTIONS =
  'You are a master ASL interpreter. You will be first presented with single word, followed by a set of two images. For each word, the following set of 2 photos represents 2 motions that correspond to said word in ASL. This acts as a dictionary to help you accurately identify and interpret ASL signs. At the end of the dictionary, you will provided with a one word instruction: INTERPRET. This will be followed by two images representing an ASL sign, and you must use your attained knowledge from the dictionary to correctly idenitify and intepret the sign, strictly returning the word in the JSON format: {"word": ""}';

  export async function POST(request: NextRequest) {
  try {
    // Parse the request body to get photo1 and photo2
    const { photo1, photo2 } = await request.json();

    // Ensure both photo1 and photo2 are provided
    if (!photo1 || !photo2) {
      return NextResponse.json(
        {
          success: false,
          failedReason: 'Both photo1 and photo2 must be provided.',
          answer: '',
        },
        { status: 400 }
      );
    }

    // Call OpenAI API to interpret the images
    const completion = await client.chat.completions.create({
      model: 'gpt-4o', // Use the appropriate OpenAI model
      messages: [
        {
          role: 'system',
          content: INSTRUCTIONS,
        },
        {
          role: 'user',
          content: [
            {
                type: 'text',
                text: 'bad',
            },
            {
                type: 'image_url',
                image_url: {
                    url: 'https://raw.githubusercontent.com/demonicsandwich/verilang/main/easyasl/public/photos/bad1.jpg',
                },
            },
            {
                type: 'image_url',
                image_url: {
                    url: 'https://raw.githubusercontent.com/demonicsandwich/verilang/main/easyasl/public/photos/bad2.jpg',
                },
            },
            {
                type: 'text',
                text: 'bye',
            },
            {
                type: 'image_url',
                image_url: {
                    url: 'https://raw.githubusercontent.com/demonicsandwich/verilang/main/easyasl/public/photos/bye1.jpg',
                },
            },
            {
                type: 'image_url',
                image_url: {
                    url: 'https://raw.githubusercontent.com/demonicsandwich/verilang/main/easyasl/public/photos/bye2.jpg',
                },
            },
            {
                type: 'text',
                text: 'good',
            },
            {
                type: 'image_url',
                image_url: {
                    url: 'https://raw.githubusercontent.com/demonicsandwich/verilang/main/easyasl/public/photos/good1.jpg',
                },
            },
            {
                type: 'image_url',
                image_url: {
                    url: 'https://raw.githubusercontent.com/demonicsandwich/verilang/main/easyasl/public/photos/good2.jpg',
                },
            },
            {
                type: 'text',
                text: 'hello',
            },
            {
                type: 'image_url',
                image_url: {
                    url: 'https://raw.githubusercontent.com/demonicsandwich/verilang/main/easyasl/public/photos/hello1.jpg',
                },
            },
            {
                type: 'image_url',
                image_url: {
                    url: 'https://raw.githubusercontent.com/demonicsandwich/verilang/main/easyasl/public/photos/hello2.jpg',
                },
            },
            {
                type: 'text',
                text: 'I',
            },
            {
                type: 'image_url',
                image_url: {
                    url: 'https://raw.githubusercontent.com/demonicsandwich/verilang/main/easyasl/public/photos/i1.jpg',
                },
            },
            {
                type: 'image_url',
                image_url: {
                    url: 'https://raw.githubusercontent.com/demonicsandwich/verilang/main/easyasl/public/photos/i2.jpg',
                },
            },
            {
                type: 'text',
                text: 'more',
            },
            {
                type: 'image_url',
                image_url: {
                    url: 'https://raw.githubusercontent.com/demonicsandwich/verilang/main/easyasl/public/photos/more1.jpg',
                },
            },
            {
                type: 'image_url',
                image_url: {
                    url: 'https://raw.githubusercontent.com/demonicsandwich/verilang/main/easyasl/public/photos/more2.jpg',
                },
            },
            {
                type: 'text',
                text: '?',
            },
            {
                type: 'image_url',
                image_url: {
                    url: 'https://raw.githubusercontent.com/demonicsandwich/verilang/main/easyasl/public/photos/question1.jpg',
                },
            },
            {
                type: 'image_url',
                image_url: {
                    url: 'https://raw.githubusercontent.com/demonicsandwich/verilang/main/easyasl/public/photos/question2.jpg',
                },
            },
            {
                type: 'text',
                text: 'thirsty',
            },
            {
                type: 'image_url',
                image_url: {
                    url: 'https://raw.githubusercontent.com/demonicsandwich/verilang/main/easyasl/public/photos/thirsty1.jpg',
                },
            },
            {
                type: 'image_url',
                image_url: {
                    url: 'https://raw.githubusercontent.com/demonicsandwich/verilang/main/easyasl/public/photos/thirsty2.jpg',
                },
            },
            {
                type: 'text',
                text: 'want',
            },
            {
                type: 'image_url',
                image_url: {
                    url: 'https://raw.githubusercontent.com/demonicsandwich/verilang/main/easyasl/public/photos/want1.jpg',
                },
            },
            {
                type: 'image_url',
                image_url: {
                    url: 'https://raw.githubusercontent.com/demonicsandwich/verilang/main/easyasl/public/photos/want2.jpg',
                },
            },
            {
                type: 'text',
                text: 'you',
            },
            {
                type: 'image_url',
                image_url: {
                    url: 'https://raw.githubusercontent.com/demonicsandwich/verilang/main/easyasl/public/photos/you1.jpg',
                },
            },
            {
                type: 'image_url',
                image_url: {
                    url: 'https://raw.githubusercontent.com/demonicsandwich/verilang/main/easyasl/public/photos/you2.jpg',
                },
            },
            {
              type: 'text',
              text: 'INTERPRET',
            },
            {
              type: 'image_url',
              image_url: {
                url: photo1, // First image URL or base64 string
              },
            },
            {
              type: 'image_url',
              image_url: {
                url: photo2, // Second image URL or base64 string
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
    });

    // Extract the AI's response
    let rawAnswer = completion.choices?.[0]?.message?.content ?? "";

    // Remove code block syntax if present
    rawAnswer = rawAnswer.replace(/```json|```/g, "").trim();
    let word;

    try {
    const parsedAnswer = JSON.parse(rawAnswer);
    word = parsedAnswer.word;
    } catch (error: any) {
    throw new Error(`Failed to parse JSON: ${error.message}\n ${rawAnswer}`);
}

    return NextResponse.json({ success: true, word });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        failedReason: (error as Error).message,
        answer: '',
      },
      { status: 500 }
    );
  }
}
