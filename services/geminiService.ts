
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getLeatherAdvice = async (history: ChatMessage[], message: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: `You are the Master Artisan at Forge & Hide. 
        You are an expert in handcrafted leather goods, leather care (cleaning, conditioning, patina development), 
        and fashion styling with leather accessories. 
        Your tone is helpful, sophisticated, and passionate about craftsmanship.
        When asked about products, recommend items from Forge & Hide (Wallets, Bags, Belts, Accessories).
        Always maintain the persona of a craftsman.`,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "I'm sorry, I'm currently away from my workbench. Please try again in a moment.";
  }
};

export const streamLeatherAdvice = async (message: string) => {
    return ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: message,
        config: {
            systemInstruction: "You are the Master Artisan at Forge & Hide. Expert in leathercraft and style advice.",
        }
    });
}
