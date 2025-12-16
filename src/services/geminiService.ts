import { GoogleGenAI } from "@google/genai";

// Declare process to satisfy TypeScript when accessing process.env.API_KEY as per guidelines
declare const process: { env: { API_KEY: string } };

// This would be used to generate questions or grade tests automatically
// For now, it is a setup stub as per requirements.

export const geminiService = {
  generateQuestion: async (topic: string): Promise<string> => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Generate a short, challenging test question about: ${topic}`,
      });
      return response.text || "No content generated.";
    } catch (error) {
      console.error("Gemini API Error", error);
      return "Error generating question.";
    }
  }
};