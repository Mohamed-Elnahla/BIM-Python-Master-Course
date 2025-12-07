import { GoogleGenAI, ChatSession } from "@google/genai";
import { CourseModule } from "../types";

// Strictly following initialization instructions
// Assuming process.env.API_KEY is available in the build environment
const apiKey = process.env.API_KEY || '';

// We only initialize if a key is present (or we handle the error gracefully downstream)
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// --- EXERCISE CHECKING ---

export const checkExerciseWithAI = async (
  instruction: string,
  userCode: string,
  executionOutput: string,
  error: string | undefined
): Promise<string> => {
  if (!ai) {
    return "API Key is missing. Unable to provide AI feedback. Please configure process.env.API_KEY.";
  }

  const model = 'gemini-2.5-flash';

  const prompt = `
    You are a helpful Python tutor for Construction/BIM professionals.
    The student was asked to perform the following task: "${instruction}"
    
    Here is their code:
    \`\`\`python
    ${userCode}
    \`\`\`
    
    Here is the execution output (stdout):
    "${executionOutput}"
    
    Here is any error message they received:
    "${error || 'None'}"
    
    Please grade this exercise. 
    1. Did they accomplish the task?
    2. Explain any mistakes simply.
    3. If correct, give a very brief encouraging remark related to BIM/Construction automation.
    4. Keep the response concise (max 3 sentences).
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text || "No response from AI.";
  } catch (e) {
    console.error("Gemini API Error:", e);
    return "Error connecting to AI tutor. Please check your internet connection or API quota.";
  }
};

// --- IMAGE GENERATION ---

export const generateExplanatoryFigure = async (visualPrompt: string): Promise<string | null> => {
  if (!ai) return null;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: visualPrompt,
      config: {
        // We do not set responseMimeType for nano banana
      }
    });

    // Iterate through parts to find image
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
           return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (e) {
    console.error("Gemini Image Gen Error:", e);
    return null;
  }
};

// --- CHAT ASSISTANT ---

let chatSession: ChatSession | null = null;

export const initChatSession = (courseContent: CourseModule[]) => {
  if (!ai) return null;

  // Create a context string of the course material
  const contextString = courseContent.map(module => {
    return `Module: ${module.title} (ID: ${module.id})\n` +
      module.sections.map(section => 
        ` - Section: ${section.title} (ID: ${section.id})\n   Content Summary: ${section.blocks.map(b => b.type === 'MARKDOWN' ? b.content.substring(0, 100) + "..." : "").join(" ")}`
      ).join("\n");
  }).join("\n\n");

  const systemInstruction = `
    You are an expert Python BIM Tutor Assistant embedded in a web course.
    
    Your Capabilities:
    1. Answer questions about Python, Revit API, Dynamo, or BIM automation.
    2. Debug code snippets provided by the user. Explain errors clearly.
    3. Guide users to specific parts of this course if relevant.
    
    COURSE CONTEXT:
    ${contextString}
    
    CRITICAL RULE FOR NAVIGATION:
    If a user asks about a topic covered in the course, you MUST reference the specific section using this exact format:
    [[Link Text]](goto:module-id|section-id)
    
    Example:
    "You can learn about lists in [[Part 2: Lists]](goto:part-2|2-2-lists)."
    
    Keep answers helpful, encouraging, and related to construction/engineering.
  `;

  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: systemInstruction,
    },
  });

  return chatSession;
};

export const sendMessageToAssistant = async (message: string): Promise<string> => {
  if (!chatSession) {
    return "Chat session not initialized.";
  }
  try {
    const result = await chatSession.sendMessage({ message });
    return result.text;
  } catch (e) {
    console.error("Chat Error:", e);
    return "I'm having trouble connecting right now. Please try again.";
  }
};