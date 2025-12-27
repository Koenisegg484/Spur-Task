import axios from "axios";

const GEMINI_API_KEY = process.env.LLM_API_KEY;
const MODEL = "models/gemini-2.5-flash";

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/${MODEL}:generateContent?key=${GEMINI_API_KEY}`;

export type LLMMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export async function generateReply(messages: LLMMessage[]): Promise<string> {
  console.log("🧠 [LLM] generateReply called");
  console.log(
    "🧠 [LLM] messages:",
    messages.map((m) => ({
      role: m.role,
      preview: m.content.slice(0, 80),
    }))
  );

  try {
    const contents = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    console.log("🧠 [LLM] Gemini payload contents length:", contents.length);

    const res = await axios.post(GEMINI_URL, {
      contents,
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 400,
      },
    });

    console.log("🧠 [LLM] Gemini raw response received");

    const text = res.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      console.error(
        "🧠 [LLM] Gemini response missing text:",
        JSON.stringify(res.data, null, 2)
      );
      return "Sorry, I couldn’t generate a response.";
    }

    console.log("🧠 [LLM] Gemini reply preview:", text.slice(0, 120));
    return text;
  } catch (err: any) {
    console.error("🔥 [LLM] Gemini error:", err.response?.data || err.message);
    return "LLM error. Please try again later.";
  }
}

// import axios from "axios";

// const GEMINI_API_KEY = process.env.LLM_API_KEY;
// const MODEL = "models/gemini-2.5-flash";

// const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/${MODEL}:generateContent?key=${GEMINI_API_KEY}`;

// export type LLMMessage = {
//   role: "system" | "user" | "assistant";
//   content: string;
// };

// export async function generateReply(messages: LLMMessage[]): Promise<string> {
//   try {
//     const systemPrompt =
//       messages.find((m) => m.role === "system")?.content ?? "";

//     const conversation = messages
//       .filter((m) => m.role !== "system")
//       .map((m) =>
//         m.role === "user" ? `User: ${m.content}` : `Assistant: ${m.content}`
//       )
//       .join("\n");

//     const finalPrompt = `
// ${systemPrompt}

// ${conversation}
// Assistant:
// `.trim();

//     const res = await axios.post(GEMINI_URL, {
//       contents: [
//         {
//           role: "user",
//           parts: [{ text: finalPrompt }],
//         },
//       ],
//       generationConfig: {
//         temperature: 0.4,
//         maxOutputTokens: 400,
//       },
//     });

//     return (
//       res.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
//       "Sorry love, I’m having a small hiccup right now. Could you try again?"
//     );
//   } catch (err: any) {
//     console.error("Gemini LLM error:", err.response?.data || err.message);
//     return "Sorry love, something went wrong on my end 💛";
//   }
// }

// import axios from "axios";

// const GEMINI_API_KEY = process.env.LLM_API_KEY;
// const MODEL = "models/gemini-2.5-flash";

// const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/${MODEL}:generateContent?key=${GEMINI_API_KEY}`;

// export type LLMMessage = {
//   role: "system" | "user" | "assistant";
//   content: string;
// };

// export async function generateReply(messages: LLMMessage[]): Promise<string> {
//   try {
//     const contents = messages.map((m) => ({
//       role: m.role === "assistant" ? "model" : "user",
//       parts: [{ text: m.content }],
//     }));

//     const res = await axios.post(GEMINI_URL, {
//       contents,
//       generationConfig: {
//         temperature: 0.4,
//         maxOutputTokens: 400,
//       },
//     });

//     return (
//       res.data?.candidates?.[0]?.content?.parts?.[0]?.text ??
//       "Sorry, I couldn’t generate a response."
//     );
//   } catch (err: any) {
//     console.error("Gemini LLM error:", err.response?.data || err.message);
//     return "LLM error. Please try again later.";
//   }
// }
