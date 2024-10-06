import { NextRequest, NextResponse } from 'next/server';
import fetch from 'node-fetch';
import FormData from 'form-data';
import { Readable } from 'stream';

// Set the environment variable type and the response type
type Data = {
  processedImageUrl?: string;
  message?: string;
};

// Named export for the POST method
export async function POST(request: NextRequest) {
  try {
    // Parse the JSON body to get the base64Image
    const { base64Image } = await request.json();

    // Check if base64Image is provided
    if (!base64Image) {
      return NextResponse.json({ message: 'No image provided' }, { status: 400 });
    }

    // Extract the base64 data from the Data URL
    const base64Data = base64Image.split(',')[1];
    const buffer = Buffer.from(base64Data, 'base64');

    // Create FormData and append the image buffer
    const formData = new FormData();
    formData.append('image', buffer, { filename: 'image.png'});
    formData.append('output_type', 'cutout');
    formData.append('bg_blur', '0');
    formData.append('scale', 'fit');
    formData.append('auto_center', 'false');
    formData.append('stroke_size', '0');
    formData.append('stroke_color', 'FFFFFF');
    formData.append('stroke_opacity', '100');
    formData.append('shadow', 'disabled');
    formData.append('shadow_opacity', '20');
    formData.append('shadow_blur', '50');
    formData.append('format', 'PNG');


    console.log(formData.getHeaders());


    // Get API Key from environment variables
    const apiKey = process.env.PICSART_API_KEY;
    if (!apiKey) {
      throw new Error('The PICSART_API_KEY environment variable is missing.');
    }

    // Make the request to the Picsart API
    const response = await fetch('https://api.picsart.io/tools/1.0/removebg', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'X-Picsart-API-Key': apiKey,
      },
      body: formData, // Type assertion
    });

    // Handle the response from the Picsart API
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { message: `Picsart API Error: ${errorData.message || response.statusText}` },
        { status: 500 }
      );
    }

    // Extract the processed image URL from the API response
    const apiResult = await response.json();
    const processedImageUrl = apiResult.data.url;

    // Return the processed image URL as a JSON response
    return NextResponse.json({ processedImageUrl });
  } catch (error: any) {
    console.error('Error processing image:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}