import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

/**
 * IMPORTANT (Vite/Vercel):
 * - Client-side env vars must use import.meta.env and be prefixed with VITE_
 * - In Vercel, create an env var: VITE_GEMINI_API_KEY
 *
 * Note: putting an API key in a frontend app exposes it to users.
 * For production, proxy Gemini through a serverless function instead.
 */
let cachedAI: GoogleGenAI | null = null;

function getAI(): GoogleGenAI | null {
  const apiKey = (import.meta.env.VITE_GEMINI_API_KEY as string | undefined) ?? "";
  if (!apiKey) return null;
  if (!cachedAI) cachedAI = new GoogleGenAI({ apiKey });
  return cachedAI;
}

export const getLeatherAdvice = async (history: ChatMessage[], message: string) => {
  const ai = getAI();
  if (!ai) {
    return "The artisan assistant isn't configured yet (missing API key).";
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: message,
      config: {
        systemInstruction: `You are the Master Artisan at Forge & Hide.
You are an expert in handcrafted leather goods, leather care (cleaning, conditioning, patina development),
and fashion styling with leather accessories.
Your tone is helpful, sophisticated, and passionate about craftsmanship.

Rules:
- Give practical, safe, step-by-step advice.
- Keep answers concise unless the user asks for detail.`,
      },
    });

    // @google/genai returns a structured response; the simplest is to read text() when available
    // Fallback to stringifying if needed.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const anyResp: any = response as any;
    if (typeof anyResp?.text === "function") return anyResp.text();
    if (typeof anyResp?.response?.text === "function") return anyResp.response.text();
    return String(anyResp);
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "I'm sorry — my tools seem a bit dull today. Please try again in a moment.";
  }
};

export const streamLeatherAdvice = async (message: string) => {
  const ai = getAI();
  if (!ai) {
    throw new Error("Missing VITE_GEMINI_API_KEY");
  }

  return ai.models.generateContentStream({
    model: "gemini-3-flash-preview",
    contents: message,
    config: {
      systemInstruction:
        "You are the Master Artisan at Forge & Hide. Expert in leathercraft and style advice.",
    },
  });
};
