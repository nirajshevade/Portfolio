import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { RESUME_CONTEXT } from '@/lib/resumeContext';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "YOUR_GEMINI_API_KEY_HERE") {
      throw new Error("GEMINI_API_KEY is not set in .env.local");
    }

    // Initialize inside the request to ensure env vars are loaded
    const ai = new GoogleGenAI({ apiKey });

    const { messages } = await req.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    const userMessage = messages[messages.length - 1].content;

    const systemPrompt = `You are Niru AI, a helpful, professional, and slightly futuristic AI assistant for Niraj Shevade.
Your purpose is to answer questions about Niraj's skills, projects, experience, resume, and contact info based ONLY on the provided context.
If the user asks about his "best" or "top" project, do not say you don't know which is best. Instead, enthusiastically summarize the projects found in the context.
If the answer is not in the context, politely say you don't have that specific information but offer to help with something else or suggest they contact Niraj directly via LinkedIn or GitHub.
Keep your answers concise, well-formatted, and easy to read. Do not hallucinate information.

Context about Niraj:
${RESUME_CONTEXT}`;

    const prompt = `${systemPrompt}\n\nUser Question: ${userMessage}\n\nAnswer:`;

    // Create a streaming response
    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    // Create a readable stream for the frontend
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of responseStream) {
            if (chunk.text) {
              controller.enqueue(new TextEncoder().encode(chunk.text));
            }
          }
          controller.close();
        } catch (error: unknown) {
          console.error("Stream generation error:", error);
          const errorMsg = error instanceof Error ? error.message : "Unknown error occurred";
          controller.enqueue(new TextEncoder().encode(`\n[API Error: ${errorMsg}]`));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });

  } catch (error: unknown) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}
