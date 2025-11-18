import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { PuppeteerWebBaseLoader } from "@langchain/community/document_loaders/web/puppeteer";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import link from "./Link.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize HuggingFace embedding model
// Note: For public models, HuggingFace Inference API can work without API key (with rate limits)
// For better performance and no rate limits, add your API key to .env.local
const embeddingModel = new HuggingFaceInferenceEmbeddings({
  apiKey: process.env.HUGGINGFACE_API_KEY || undefined,
  model: "sentence-transformers/all-MiniLM-L6-v2",
});

// Filter and validate URLs
const urls = link.filter((url) => url && typeof url === "string");
console.log("URLs to scrape:", urls);

if (urls.length === 0) {
  throw new Error("No valid URLs found in Link.js");
}

// Load documents from URLs with Puppeteer for full JavaScript rendering
const loadDocuments = async () => {
  console.log("Starting document loading with Puppeteer...");
  
  const allDocs = [];
  
  for (let index = 0; index < urls.length; index++) {
    const url = urls[index];
    try {
      console.log(`\nLoading URL ${index + 1}/${urls.length}: ${url}`);
      
      // Create Puppeteer loader with options to wait for content
      const loader = new PuppeteerWebBaseLoader(url, {
        launchOptions: {
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        },
        gotoOptions: {
          waitUntil: "networkidle2", // Wait until network is idle
          timeout: 60000, // 60 second timeout
        },
        // Wait for content to load
        async evaluate(page) {
          // Wait for main content to be rendered
          await page.waitForSelector('body', { timeout: 60000 });
          
          // Additional wait for dynamic content (using setTimeout in page context)
          await new Promise(resolve => setTimeout(resolve, 8000));
          
          // Extract all text content, removing scripts and styles
          const content = await page.evaluate(() => {
            // Remove script and style elements
            const scripts = document.querySelectorAll('script, style, noscript');
            scripts.forEach(el => el.remove());
            
            // Get all text content
            return document.body.innerText;
          });
          
          return content;
        },
      });
      
      const docs = await loader.load();
      
      if (docs && docs.length > 0 && docs[0].pageContent) {
        let content = docs[0].pageContent;
        
        // Clean up excessive whitespace and newlines
        content = content.replace(/\s+/g, ' ').trim();
        
        // Update the document with cleaned content
        docs[0].pageContent = content;
        
        console.log(`✓ Loaded ${docs.length} documents from ${url}`);
        console.log(`  Content length: ${content.length} characters`);
        console.log(`  Preview: ${content.substring(0, 200)}...`);
        
        allDocs.push(...docs);
      } else {
        console.log(`✗ No content loaded from ${url}`);
      }
    } catch (error) {
      console.error(`✗ Error loading ${url}:`, error.message);
    }
  }
  
  console.log(`\nTotal loaded documents: ${allDocs.length}`);
  
  if (allDocs.length > 0) {
    console.log(`\nFirst document preview (300 chars):`);
    console.log(allDocs[0].pageContent.substring(0, 300));
  }
  
  return allDocs;
};

// Initialize and save vector store
const initializeVectorStore = async () => {
  console.log("Initializing vector store...");
  
  const documents = await loadDocuments();
  
  if (documents.length === 0) {
    throw new Error("No documents loaded. Check URLs and network access.");
  }

  // Split documents into chunks
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50,
  });
  
  console.log("Splitting documents into chunks...");
  const allSplits = await textSplitter.splitDocuments(documents);
  console.log(`Number of document chunks: ${allSplits.length}`);
  
  if (allSplits.length === 0) {
    throw new Error("No document splits created. Check document content.");
  }

  // Create vector store
  console.log("Creating FAISS vector store...");
  const vectorStore = await FaissStore.fromDocuments(
    allSplits,
    embeddingModel
  );
  
  // Save to disk
  const indexPath = path.resolve(__dirname, "../app/api/faiss_index");
  console.log(`Saving vector store to: ${indexPath}`);
  await vectorStore.save(indexPath);
  console.log("Vector store saved successfully!");
  
  return vectorStore;
};

// Run the script
(async () => {
  try {
    console.log("=== Starting Portfolio Data Scraping ===\n");
    await initializeVectorStore();
    console.log("\n=== Scraping and vectorization complete! ===");
    console.log("Vector store is ready at: app/api/faiss_index");
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
})();
