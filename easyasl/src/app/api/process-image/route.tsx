import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
import FormData from 'form-data';

type Data = {
  processedImageUrl?: string;
  message?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { base64Image } = req.body;

    if (!base64Image) {
      return res.status(400).json({ message: 'No image provided' });
    }

    try {
      // Extract the base64 data from the Data URL
      const base64Data = base64Image.split(',')[1];
      const buffer = Buffer.from(base64Data, 'base64');

      // Create FormData
      const formData = new FormData();
      formData.append('file', buffer, { filename: 'image.png', contentType: 'image/png' });
      formData.append('output_type', 'cutout');
      formData.append('format', 'PNG');
      // Add other parameters as needed...

      const response = await fetch('https://api.picsart.io/tools/1.0/removebg', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'X-Picsart-API-Key': process.env.PICSART_API_KEY!, // Use your environment variable
        },
        body: formData as any, // Type assertion
      });

      if (!response.ok) {
        const errorData = await response.json();
        return res.status(500).json({ message: `Picsart API Error: ${errorData.message || response.statusText}` });
      }

      const apiResult = await response.json();
      const processedImageUrl = apiResult.data.url;

      return res.status(200).json({ processedImageUrl });
    } catch (error: any) {
      console.error('Error processing image:', error);
      return res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
