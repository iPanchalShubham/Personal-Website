import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export const createPineconeIndex = async (
  client: any,
  indexName: any,
  vectorDimension: any
) => {
  console.log(`Checking if the index: ${indexName} already exists...`);
  const existingIndexes = await client.listIndexes();
  if (!existingIndexes.includes(indexName)) {
    console.log(`Creating index: ${indexName}...`);

    const createdClient = await client.createIndex({
      createRequest: {
        name: indexName,
        dimension: vectorDimension,
        matric: "cosine",
      },
    });
    console.log(
      `Creating index.... please wait for it to finish initializing.`
    );
    await new Promise((resolve) => setTimeout(resolve, 180000));
  } else {
    console.log(`Index: ${indexName} already exists.`);
  }
};

export const updatePineconeIndex = async (
  client: any,
  indexName: any,
  docs: any
) => {
  console.log("Updating index...");
  console.log("querying pinecone index...");
  const index = await client.Index(indexName);
  console.log(`Pinecone index: retrieved:  ${index}`);

  //Process the docs
  for (const doc of docs) {
    const txtPath = doc.metadata.source;
    const text = doc.pageContent;
    console.log(`Splitting text into chunks.... `);
    // Helpful link: https://www.perplexity.ai/search/204af37d-e06a-4e68-a0a6-20d1dc83bda2?s=u
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
    });
    const chunks = await textSplitter.createDocuments([text]);
    console.log(`finished splitting text, total chunks: ${chunks.length}`);
    const embeddings = new OpenAIEmbeddings();
    const embeddingsArray = await embeddings.embedDocuments(
      chunks.map((chunk) => chunk.pageContent.replace(/\n/g, ""))
    );
    console.log(`finished embedding docs`);
    console.log(
      `Creating ${chunks.length} vectors array with id, values, and metadata...`
    );
    // create and upsert vectors in the batches of 100
    const batchSize = 100;
    let batch = [];
    for (let idx = 0; idx < chunks.length; idx++) {
      const chunk = chunks[idx];

      const vector = {
        id: `${txtPath}_${idx}`,
        values: embeddingsArray[idx],
        metadata: {
          ...chunk.metadata,
          loc: JSON.stringify(chunk.metadata.loc),
          pageContent: chunk.pageContent,
          txtPath: txtPath,
        },
      };
      batch.push(vector);
      if (batch.length === batchSize || idx === chunks.length - 1) {
        await index.upsert({
          upsertRequest: {
            vectors: batch,
          },
        });
        // Empty the batch
        batch = [];
      }
    }
    // 10. Log the number of vectors updated
    console.log(`Pinecone index updated with ${chunks.length} vectors`);
  }
};


export enum MsgType {
  human = "human",
  ai = "ai",
}

