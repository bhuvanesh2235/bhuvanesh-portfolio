// scripts/seed-project-rag-bot.ts
// Adds the Multilingual RAG Bot project to the DB
// Run with: npx tsx scripts/seed-project-rag-bot.ts

import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL not set in .env.local');
}
const sql = neon(process.env.DATABASE_URL);

async function seed() {
  console.log('🌱 Adding Multilingual RAG Bot...');

  await sql`DELETE FROM projects WHERE slug = 'multilingual-rag-bot'`;

  await sql`
    INSERT INTO projects (
      slug, title, year, tagline, description,
      problem, approach, implementation, impact,
      tech_stack, tags, cover_image, images,
      demo_url, github_url, featured, sort_order
    ) VALUES (
      'multilingual-rag-bot',

      'Multilingual RAG Bot',

      2025,

      'Upload PDFs and ask questions in English, Tamil, or Hindi — powered by Google Gemini, LangChain, FAISS & Whisper.',

      'A production-quality Retrieval-Augmented Generation (RAG) chatbot that allows users to upload multiple PDFs and ask questions in English, Tamil, or Hindi. The system automatically detects the query language and responds in the same language, with page-level source citations. Supports voice input via Whisper transcription and real-time streaming responses via SSE.',

      'LLMs hallucinate when answering questions about private documents. Traditional chatbots lack multilingual support for Indian languages like Tamil and Hindi, and most RAG demos are single-file, English-only prototypes without voice input or streaming — making them unsuitable for real-world production use.',

      'Built a full RAG pipeline: PDF extraction (pdfplumber + PyPDF2) → RecursiveCharacterTextSplitter chunking (1000 chars, 200 overlap) → GoogleGenerativeAIEmbeddings → FAISS Flat L2 vector index (persisted to disk) → Top-K=5 similarity retrieval → langdetect language routing → multilingual system prompt → Gemini 1.5 Flash streaming. Added faster-whisper for voice-to-text transcription in EN/TA/HI.',

      'Flask backend exposes REST + SSE endpoints: /upload (multi-PDF, returns chunk/page stats), /chat (streaming token-by-token via text/event-stream), /voice (audio → transcript), /documents (index reset). React + Tailwind frontend with drag-and-drop PDF upload, useChat / useUpload hooks, and real-time chat UI. Nginx reverse-proxies /api/* to the Flask backend. Fully containerized: docker compose up --build starts both services in one command with persistent FAISS volumes.',

      'Delivered a fully production-ready RAG chatbot: accurate multilingual Q&A over private PDFs with page-level citations, sub-second streaming responses, voice input in 3 languages, and one-command Docker deployment. Demonstrates end-to-end LLM engineering — from document ingestion and vector search to prompt routing and streaming generation.',

      ARRAY['Python','Flask','LangChain','Google Gemini','FAISS','GoogleGenerativeAIEmbeddings','faster-whisper','pdfplumber','PyPDF2','langdetect','React','Vite','Tailwind CSS','Axios','Nginx','Docker','Docker Compose','gunicorn','SSE'],

      ARRAY['GenAI','LLM','RAG','LangChain','Python','NLP','Multilingual','Docker','Full-Stack'],

      '/projects/rag-bot.png',
      '{}',
      NULL,
      'https://github.com/bhuvanesh2235/multilingual-rag-bot',
      true,
      5
    )
  `;

  const rows = await sql`SELECT slug, title FROM projects ORDER BY sort_order` as { slug: string; title: string }[];
  console.log('\n✅ Projects in DB:');
  rows.forEach((r) => console.log(`  • [${r.slug}] ${r.title}`));
  console.log('\n🎉 Done!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
