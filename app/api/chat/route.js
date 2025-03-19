import { NextResponse } from 'next/server';
import "cheerio";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
// import { Document } from "@langchain/core/documents";
import { Annotation, StateGraph } from "@langchain/langgraph";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { OpenAI } from "openai";

// Properly type the OpenAI client
const openai = new OpenAI({
  baseURL: 'https://api.studio.nebius.com/v1/',
  apiKey: process.env.NEBIUS_API_KEY || '', // Add fallback to prevent undefined
});

const embeddingModel = new HuggingFaceTransformersEmbeddings({
  model: "Xenova/all-MiniLM-L6-v2",
});

// Initialize vectorStore as a global variable
let vectorStore = null;

// Define state types properly
const StateAnnotation = Annotation.Root({
  question: Annotation,
  context: Annotation,
  answer: Annotation,
});

const retrieve = async (state) => {
  const retrievedDocs = await vectorStore.similaritySearch(state.question);
  return { context: retrievedDocs };
};

const generate = async (state) => {
  const docsContent = state.context.map((doc) => doc.pageContent).join("\n");
  const prompt = `You are a portfolio assistant for question-answering tasks.
  Use the following pieces of retrieved context to answer the question.
  If you don't know the answer, just say that you don't know.
  Use three sentences maximum and keep the answer concise.

  Question: ${state.question}
  Context: ${docsContent}
  Answer:`;

  const response = await openai.chat.completions.create({
    model: "meta-llama/Meta-Llama-3.1-8B-Instruct",
    messages: [{ role: "user", content: prompt }],
    temperature: 0,
    top_p: 0.9,
  });

  return { answer: response.choices[0].message.content };
};

const graph = new StateGraph(StateAnnotation)
  .addNode("retrieve", retrieve)
  .addNode("generate", generate)
  .addEdge("__start__", "retrieve")
  .addEdge("retrieve", "generate")
  .addEdge("generate", "__end__")
  .compile();

// Initialize vectorStore if not already initialized
const initializeVectorStore = async () => {
  if (!vectorStore) {
    const cheerioLoader = new CheerioWebBaseLoader(
      "https://portfolio-ayushiiitus-projects.vercel.app/"
    );
    const docs = await cheerioLoader.load();
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const allSplits = await splitter.splitDocuments(docs);

    vectorStore = new FaissStore(embeddingModel, {});
    await vectorStore.addDocuments(allSplits);
  }
};

export async function POST(req) {
  try {
    const body = await req.json();
    const question = body.question;

    if (!question) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      );
    }

    // Initialize vectorStore if needed
    await initializeVectorStore();

    if (!vectorStore) {
      return NextResponse.json(
        { error: 'Chat system not initialized properly' },
        { status: 500 }
      );
    }

    const result = await graph.invoke({ question });
    return NextResponse.json({ answer: result.answer });
  } catch (error) {
    console.error('Error in chat API:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Internal server error', details: errorMessage },
      { status: 500 }
    );
  }
}

// Add handler for GET requests
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Please use POST.' },
    { status: 405 }
  );
}

// Add OPTIONS handler for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}