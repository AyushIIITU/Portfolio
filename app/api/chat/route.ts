import { NextRequest, NextResponse } from "next/server";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import path from "path";

// Initialize HuggingFace embedding model
// Note: For public models, can work without API key (with rate limits)
const embeddingModel = new HuggingFaceInferenceEmbeddings({
  apiKey: process.env.HUGGINGFACE_API_KEY || undefined,
  model: "sentence-transformers/all-MiniLM-L6-v2",
});

// Load vector store
let vectorStore: FaissStore | null = null;

async function getVectorStore() {
  if (!vectorStore) {
    const indexPath = path.resolve(process.cwd(), "app/api/faiss_index");
    vectorStore = await FaissStore.load(indexPath, embeddingModel);
  }
  return vectorStore;
}

// Function to query Perplexity API
async function queryPerplexityAPI(question: string, context: string) {
  const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;
  
  if (!PERPLEXITY_API_KEY) {
    throw new Error("PERPLEXITY_API_KEY is not set in environment variables");
  }

  const prompt = `You are a helpful portfolio assistant. Use the following context to answer the question. If you don't know the answer based on the context, say so politely.

Context: ${context}

Question: ${question}

Answer:`;

const response = await fetch("https://api.perplexity.ai/chat/completions", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${PERPLEXITY_API_KEY}`,
    },
    body: JSON.stringify({
        model: "sonar-pro",
        messages: [
            {
                role: "system",
                content: "You are Ayush's portfolio assistant. Your role is to answer questions about Ayush's professional background, skills, projects, and experience based strictly on the provided context. Only provide information that is present in the context. If a question is outside the scope of Ayush's portfolio or cannot be answered from the context, politely redirect the user to ask about Ayush's work, skills, or projects. Be concise and professional."
            },
            {
                role: "user",
                content: prompt
            }
        ],
        temperature: 0.2,
        max_tokens: 500,
    }),
});

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Perplexity API error: ${response.status} - ${errorData}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question } = body;

    if (!question) {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

    // Load vector store and retrieve relevant documents
    const store = await getVectorStore();
    const retrievedDocs = await store.similaritySearch(question,9);
    
    // Combine document content as context
    const context = retrievedDocs
      .map((doc) => doc.pageContent)
      .join("\n\n");

    // Query Perplexity API with context
    const answer = await queryPerplexityAPI(question, context);

    return NextResponse.json({ answer });
  } catch (error: unknown) {
    console.error("Error in chatbot API:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to process question";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
