import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyDwxN5Azguw4qYGlmu1H2TDAJSE3swHBEY" });

async function analyze() {
  const urls = [
    "https://huprbedahpwszatolkce.supabase.co/storage/v1/object/public/Vortex%20Mp4%20Drive/Section%201.png",
    "https://huprbedahpwszatolkce.supabase.co/storage/v1/object/public/Vortex%20Mp4%20Drive/Section%202.jpeg",
    "https://huprbedahpwszatolkce.supabase.co/storage/v1/object/public/Vortex%20Mp4%20Drive/Section%203.jpeg"
  ];

  for (let i = 0; i < urls.length; i++) {
    console.log(`Analyzing image ${i + 1}...`);
    try {
      const response = await fetch(urls[i]);
      const buffer = await response.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      const mimeType = urls[i].endsWith('.png') ? 'image/png' : 'image/jpeg';

      const result = await ai.models.generateContent({
        model: "gemini-3.1-flash-preview",
        contents: [
          {
            inlineData: {
              data: base64,
              mimeType: mimeType
            }
          },
          "Extract all text from this image exactly as it appears. Pay special attention to any placeholders like [Text] or similar. Describe the layout and the robot in the image."
        ]
      });
      console.log(`Result for image ${i + 1}:`, result.text);
    } catch (e) {
      console.error(e);
    }
  }
}

analyze();
