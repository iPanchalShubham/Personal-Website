"use client";
import React, { useEffect, useRef, useState } from "react";
import Message from "./message";
import ChatInput from "./chatInput";
import { MsgType } from "../utils";
import { Input } from "@/components/ui/input"
function Chat() {
  const [activeChat, setActiveChat] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 0,
      text: "Hey Shubham this side, how can i help you?",
      msgMetaData: { type: MsgType.ai, isLoading: false },
    },
  ]);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div
      className={`fixed inset-x-6 sm:inset-x-auto sm:right-8 sm:bottom-8 bottom-4  shadow-xl    z-50 bg-background  rounded    ${
        activeChat ? "inset-x-2" : ""
      } duration-300 sm:w-96 `}
    >
      <div
        onClick={() => {
          setActiveChat((prevState) => !prevState);
        }}
        className="cursor-pointer hover:underline items-start space-y-0.5  w-full flex flex-col px-4  py-4 border-b-2"
      >
        <div className="text-xs font-medium ">Chat with</div>

        <div className="flex justify-between space-x-1 items-center w-full ">
          <div className="flex items-center space-x-1.5">
            <svg
            fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              // stroke="black"
              className="w-5 h-5 text-primary"
            >
              
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
              />
            </svg>

            {/* <span className="rounded-full bg-emerald-500  p-1 " /> */}

            <div className="font-medium text-sm"> My Avatar</div>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className={`w-4 h-4  ${
                activeChat ? "-rotate-180" : ""
              } duration-300`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>
      </div>
      {/* Chat */}
      <div
        // If user have clicked on the chat button, expand the chat UI
        className={`${
          activeChat ? "sm:h-80  h-[75vh] py-2 " : "h-0 "
        } duration-300 ease-in-out  px-2`}
      >
        {activeChat ? (
          <div className="w-full flex flex-col justify-between h-full max-h-fit ">
            <div className="overflow-y-auto space-y-3 ">
              {messages.map((msgObj, i) => (
                <Message key={i} msgObj={msgObj} />
              ))}
              <div ref={bottomRef} />
            </div>

            <ChatInput setMessages={setMessages} pastMessages={messages} />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Chat;
