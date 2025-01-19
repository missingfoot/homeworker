import { Handler } from '@netlify/functions';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { image } = JSON.parse(event.body || '{}');
    if (!image) {
      throw new Error('No image provided');
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this homework image. First describe what you see, then identify any mistakes, and finally generate 3 personalized follow-up questions that would help the student improve. Format your response with clear sections."
            },
            {
              type: "image_url",
              image_url: image
            }
          ]
        }
      ],
      max_tokens: 1000,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        analysis: response.choices[0].message.content
      }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};

export { handler }; 