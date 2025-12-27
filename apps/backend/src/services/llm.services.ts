import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.LLM_API_KEY,
});

export type LLMMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export async function generateReply(messages: LLMMessage[]): Promise<string> {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.3,
      max_tokens: 300,
    });

    return (
      response.choices[0]?.message?.content ??
      "Sorry, I couldn’t generate a response."
    );
  } catch (error) {
    console.error("LLM error:", error);
    return "Sorry, I’m having trouble right now. Please try again later.";
  }
}
