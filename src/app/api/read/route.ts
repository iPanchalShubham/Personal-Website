import { NextRequest, NextResponse } from "next/server";
import { PineconeClient } from "@pinecone-database/pinecone";
import { BufferMemory, ChatMessageHistory } from "langchain/memory";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { CallbackManager } from "langchain/callbacks";
import {
  AIChatMessage,
  HumanChatMessage,
} from "langchain/schema";
import {
 PromptTemplate
} from "langchain/prompts";

const getPastMessages = (pastMessages: any) => {
  return pastMessages.map((msgObj: any) => {
    switch (msgObj.msgMetaData.type) {
      case "ai":
        return new AIChatMessage(msgObj.text);
      case "human":
        return new HumanChatMessage(msgObj.text);
      default:
        throw new TypeError(
          `Unsupported message type: ${msgObj.msgMetaData.type}`
        );
    }
  });
};

export async function POST(req: Request) {
  const { query, pastMessages } = await req.json();
  // const body = "what makes mr. fenyman sad?"
  const client = new PineconeClient();
  
  await client.init({
    apiKey: process.env.PINECONE_API_KEY || "",
    environment: process.env.PINECONE_ENVIRONMENT || "",
  });
  const indexName = "shubhampanchal";

  console.log(`Querying index: ${indexName}`);
  const index = client.Index(indexName);
  const embeddings = new OpenAIEmbeddings();

  console.log(`Asking question: ${query}...`);

  // const memory = new BufferWindowMemory({ k: 1 });
  const encoder = new TextEncoder();
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();
  const streamingModel = new ChatOpenAI({
    streaming: true,
    modelName: "gpt-3.5-turbo",
    temperature: 0.7,
    callbackManager: CallbackManager.fromHandlers({
      handleLLMNewToken: async (token: string) => {
        // return a stream
        await writer.ready;
        await writer.write(
          encoder.encode(`data:  ${token.replace(/["'\n\r]/g, "")}\n\n`)
        );
        // streamedResponse += token;
        // console.log(streamedResponse);
      },
      handleLLMEnd: async () => {
        await writer.ready;
        await writer.close();
      },
      handleLLMError: async (e: Error) => {
        await writer.ready;
        await writer.abort(e);
      },
    }),
  });

  const customPromptTemplate = new PromptTemplate({
    template: "You are an AI Avatar of Shubham Panchal. So answer every question in the first person narrative as Shubham Panchal.  keep your answer very short and concise. If something is asked out of the context provided just say that `I am not allowed to answer any question that does not belongs to me (shubham panchal)`. Also you can use the provided context and the conversation between you and human to answer the question at the end. \n\ncontext:{context}\nconversation_histroy:{chat_history}\n Question: {question}\n",
    inputVariables: ["context","question",'chat_history'],
  });
  
  // const questionPrompt = HumanMessagePromptTemplate.fromTemplate(
  //   "Rephrase the following question as if you were shubham{question}"
  // )
  const nonStreamingModel = new ChatOpenAI({});
  const vectorStore =  PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex: index,
  });
  const chain = ConversationalRetrievalQAChain.fromLLM(
    streamingModel,
    (await vectorStore).asRetriever(),

    {
      qaChainOptions: {
        prompt: customPromptTemplate,
        type:"stuff",
        verbose: true
      },
      
      verbose: true,
      memory: new BufferMemory({
        returnMessages: true,

        // k: 1, //remember the most recent  conversation
        chatHistory: new ChatMessageHistory(getPastMessages(pastMessages)),
        memoryKey: "chat_history", // Must be set to "chat_history"
        inputKey: "question", // The key for the input to the chain
        outputKey: "text", // The key for the final conversational output of the chain
      }),
      returnSourceDocuments: true,
      questionGeneratorChainOptions: {
        llm: nonStreamingModel,
      },
    }
  );

  // 11. Execute the chain with input documents and question
  chain.call({
    // input_documents: [new Document({ pageContent: sticthedMatches })],
    question: query,
  });

  return new NextResponse(stream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
    },
  });
}
