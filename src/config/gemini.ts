import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "./env";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

interface VerseResponse {
    reference: string;
    versicle: string;
}

export async function GeminiChat({ reference, versicle }: VerseResponse) {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `What does the verse mean, and do not include special characters: ${reference}, ${versicle}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const resume = response.text();
    console.log(resume);

    return resume;
}
