import { updatePineconeIndex, createPineconeIndex } from "@/components/utils";
import { NextResponse } from "next/server";
import { PineconeClient } from "@pinecone-database/pinecone";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { TextLoader } from "langchain/document_loaders/fs/text";

export async function GET() {
  const loader = new DirectoryLoader("./documents", {
    ".txt": (path) => new TextLoader(path),
    ".md": (path) => new TextLoader(path),
    // ".pdf": (path) => new PDFLoader(path),
  });
  const docs = await loader.load();
  const vectorDimensions = 1536;
  const client = new PineconeClient()

  await client.init({
    apiKey: process.env.PINECONE_API_KEY || '',
    environment: process.env.PINECONE_ENVIRONMENT || ''
  })

  try {
    // await createPineconeIndex(client, "shubhampanchal", vectorDimensions)
    await updatePineconeIndex(client, "shubhampanchal", docs)
  } catch (err) {
    console.log('error: ', err)
    return NextResponse.json({
      err
    })
  }

  return NextResponse.json({
    data: 'successfully created index and loaded data into pinecone...'
  })
}
